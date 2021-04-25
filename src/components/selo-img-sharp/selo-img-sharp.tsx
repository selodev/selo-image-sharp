import { Component, Host, h, Prop, State, Build } from '@stencil/core';
import { imageOptionsBuilder } from '../../utils';
import { generateImageData } from '../../utils/image-data/generate-image-data';
import { ImageOptions, ImageProps, SourceMetadata } from '../../utils/models';

@Component({
  tag: 'selo-img-sharp',
  styleUrl: 'selo-img-sharp.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class SeloImageSharp {
  @Prop() loading: 'auto' | 'lazy' | 'eager';
  @Prop() shouldLoad: boolean;
  @Prop() nativeLoading: boolean;
  @Prop() src: string = '/assets/images/NEWLOGO.png';
  @Prop() alt: string;
  @Prop({ mutable: true }) sourceMetadata: SourceMetadata;
  @State() imageProps: ImageProps;
  @Prop({ mutable: true }) options: ImageOptions;

  componentShouldUpdate(prev, newVal, propname) {
    console.log('shouldupdate', prev, newVal, propname);
  }
  async componentWillLoad() {
    if (!Build.isBrowser) {
      if ('loading' in HTMLImageElement.prototype && this.shouldLoad) {
        console.log('isload');
        // supported in browser
        this.shouldLoad = false;
        this.nativeLoading = true;
      } else {
        this.nativeLoading = false;
        // fetch polyfill/third-party library
      }
      let options = await imageOptionsBuilder(this.src);
      if (this.sourceMetadata) {
        console.log('this.sourceMetadata', this.sourceMetadata);
        options = {
          ...options,
          sourceOptions: {
            ...options?.sourceOptions,
            sourceMetadata: this.sourceMetadata,
          },
        };
      }
      this.options = options;

      if (this.options) {
        this.imageProps = await generateImageData(this.options);
        this.sourceMetadata ??= this?.imageProps?.images?.fallback?.sourceMetadata;
        console.log('sourceMetadata in component', this.sourceMetadata);
      } else {
        throw 'Image options object is required.';
      }
    } else {
      const res = await fetch('assets/images/image-props/NEWLOGO.json');
      const imageProps = await res.json();
      this.imageProps = imageProps;
    }
  }
  getImages(loading, imageProps) {
    const {
      images: {
        fallback: { type, src, srcset, sizes },
        sources,
      },
    } = imageProps;
    return (
      <selo-img
        loading={loading}
        src={src}
        alt={this.alt}
        srcset={srcset}
        sizes={sizes}
        sources={sources}
        type={type}
      >
        <slot></slot>
      </selo-img>
    );
  }
  render() {
    console.log('sourceMetadata in render', this.sourceMetadata);

    console.log(this.shouldLoad, this.imageProps);
    return (
      <Host>
        {this.imageProps &&
          (this.nativeLoading && this.loading
            ? this.getImages(this.loading, this.imageProps)
            : this.getImages(null, this.imageProps))}
      </Host>
    );
  }
}
