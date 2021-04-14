import { Component, Host, h, Build, Prop } from '@stencil/core';
import { getImageInformation } from '../../utils/ex/get-image-information';
import { getImageSizes } from '../../utils/ex/get-image-sizes';
import { resizeFormatImageToFile } from '../../utils/resize-format-image-to-file';

@Component({
  tag: 'selo-image-sharp',
  styleUrl: 'selo-image-sharp.css',
  shadow: false,
})
export class SeloImageSharp {
  @Prop() alt?: string;
  @Prop() src?: string;
  @Prop() width: number;
  @Prop() height: number;
  formats: string[] = ['auto', 'avif', 'webp'];
  quality: number = 75;

  async componentWillLoad() {
    if (!Build.isBrowser) {
      await this.resizeFormatImages(this.src, this.quality, this.formats);
    }
  }
  async resizeFormatImages(src: string, quality: number, formats: string[]) {
    const sizes = await getImageSizes(src);
    let promises = [];
    formats.forEach(async format => {
      promises = [
        ...promises,
        ...sizes.map(({ width, height }) =>
          resizeFormatImageToFile({
            src,
            width,
            height,
            format,
            quality,
          }),
        ),
      ];
    });
    await Promise.all(promises);
  }

  async getSrcset(formats: string[], src: string) {
    let sizes = await getImageSizes(src);
    let srcSets = [];
    formats.forEach(format => {
      srcSets = [
        ...srcSets,
        ...sizes.map(size => {
          const { width, height } = size;
          const { formattedImageName, srcPath } = getImageInformation({
            src,
            width,
            height,
            format,
          });
          const type = `image/${format}`;
          const imageSrcset = `${srcPath}formats/${format}/${formattedImageName}`;
          const media = width && `(min-width: ${Math.round(width)}px)`;
          return <source type={type} media={media} srcSet={imageSrcset} />;
        }),
      ];
    });
    return srcSets;
  }

  render() {
    return (
      <Host>
        <selo-image src={this.src} alt={this.alt}>
          {!Build.isBrowser && this.src && this.getSrcset(this.formats, this.src)}
        </selo-image>
        <slot></slot>
      </Host>
    );
  }
}
