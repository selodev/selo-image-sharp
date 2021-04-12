import { Component, Host, h, Build, Prop } from '@stencil/core';
import { getImageInformation } from '../../utils/get-image-information';
import { getImageSizes } from '../../utils/get-image-sizes';
import { resizeFormatImageToFile } from '../../utils/resize-format-image-to-file';

@Component({
  tag: 'selo-image-sharp',
  styleUrl: 'selo-image-sharp.css',
  shadow: true,
})
export class SeloImageSharp {
  @Prop() alt?: string;
  @Prop() src?: string;
  @Prop() width: number;
  @Prop() height: number;
  formats: string[] = ['avif', 'webp'];
  quality: number = 85;

  async componentWillLoad() {
    if (!Build.isBrowser && this.src) {
      console.log(Build.isDev);
      await this.resizeFormatImages();
    }
  }

  async resizeFormatImages() {
    const sizes = getImageSizes({ width: this.width, height: this.height });
    let promises = [];
    this.formats.forEach(async format => {
      promises = [
        ...promises,
        ...sizes.map(({ width, height }) =>
          resizeFormatImageToFile({
            src: this.src,
            width,
            height,
            format,
            quality: this.quality,
          }),
        ),
      ];
    });
    return await Promise.all(promises);
  }

  getSrcset(formats) {
    let sizes = getImageSizes({ width: this.width, height: this.height });
    return formats.map(format => {
      return sizes.map(size => {
        const { width, height } = size;
        const { formattedImageName } = getImageInformation({
          src: this.src,
          width,
          height,
          format,
          quality: this.quality,
        });
        const media = width && `(min-width: ${Math.round(width)}px)`;
        return media ? <source media={media} srcSet={formattedImageName} /> : <source srcSet={formattedImageName} />;
      });
    });
  }

  render() {
    return (
      <Host>
        <selo-image src={this.src} alt={this.alt}>
          {this.src && this.getSrcset(this.formats)}
        </selo-image>
        <slot></slot>
      </Host>
    );
  }
}
