import { Component, Host, h, Build, Prop } from '@stencil/core';
import { getImageInformation } from '../../utils/get-image-information';
import { resizeFormatImages, getImageSizes } from '../../sharp.worker';

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
  formats: string[] = ['avif', 'webp'];
  quality: number = 75;

  async connectedCallback() {
    if (!Build.isBrowser) {
      const images = await resizeFormatImages(this.src, this.quality, this.formats);
      console.log(images);
    }
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

          const imageSrcset = `${srcPath}formats/${format}/${formattedImageName}`;
          const media = width && `(min-width: ${Math.round(width)}px)`;
          return media ? <source media={media} srcSet={imageSrcset} /> : <source srcSet={imageSrcset} />;
        }),
      ];
    });
    return srcSets;
  }

  render() {
    return (
      <Host>
        <selo-image src={this.src} alt={this.alt}>
          {this.src && this.getSrcset(this.formats, this.src)}
        </selo-image>
        <slot></slot>
      </Host>
    );
  }
}
