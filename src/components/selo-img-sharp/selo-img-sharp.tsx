import { Component, Host, h, Prop, State, Build } from '@stencil/core';
import { imageOptionsBuilder } from '../../utils';
import { generateImageData } from '../../utils/image-data/generate-image-data';
import { ImageOptions, ImageProps } from '../../utils/models';

@Component({
  tag: 'selo-img-sharp',
  styleUrl: 'selo-img-sharp.css',
  shadow: false,
})
export class SeloImageSharp {
  @Prop() src: string = 'assets/images/NEWLOGO.png';
  @Prop() alt: string;
  @State() imageProps: ImageProps;
  @Prop({ mutable: true }) options: ImageOptions;

  async componentWillLoad() {
    this.options = await imageOptionsBuilder(this.src);
    if (this.options && !Build.isBrowser) {
      this.imageProps = await generateImageData(this.options);
    } else {
      throw new Error('Image options object is required.');
    }
  }

  render() {
    const {
      images: {
        fallback: { type, src, srcset, sizes },
        sources,
      },
    } = this.imageProps;

    return (
      <Host>
        {this.imageProps && (
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
  }
}
