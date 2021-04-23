import { Component, Host, h, Prop, State, Build } from '@stencil/core';
import { imageOptionsBuilder } from '../../utils';
import { generateImageData } from '../../utils/image-data/generate-image-data';
import { ImageOptions, ImageProps, SourceMetadata } from '../../utils/models';

@Component({
  tag: 'selo-img-sharp',
  styleUrl: 'selo-img-sharp.css',
  shadow: false,
})
export class SeloImageSharp {
  @Prop() src: string = '/assets/images/NEWLOGO.png';
  @Prop() alt: string;
  @State() imageProps: ImageProps;
  @Prop({ mutable: true }) options: ImageOptions;

  async componentWillLoad() {
    if (!Build.isBrowser) {
      let options = await imageOptionsBuilder(this.src);

      const sourceMetadata: SourceMetadata = await import(
        '../../assets/images/NEWLOGO.json'
      );
      options = {
        ...options,
        sourceOptions: { ...options.sourceOptions, sourceMetadata },
      };
      this.options = options;
      if (this.options) {
        this.imageProps = await generateImageData(this.options);
      } else {
        throw 'Image options object is required.';
      }
    }
  }

  render() {
    if (!Build.isBrowser) {
      const {
        images: {
          fallback: { type, src, srcset, sizes },
          sources,
        },
      } = this.imageProps;

      return (
        <Host>
          {this?.imageProps && (
            <selo-img
              src={src}
              alt={this.alt}
              srcset={srcset}
              sizes={sizes}
              sources={sources}
              type={type}
            >
              <slot></slot>
            </selo-img>
          )}
        </Host>
      );
    }else{
      return
    }
  }
}
