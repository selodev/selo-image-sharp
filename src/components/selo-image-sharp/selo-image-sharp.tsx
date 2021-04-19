import { Component, Host, h, Build, Prop, Watch } from '@stencil/core';
import { generateImageData } from '../../utils/image-data/generarte-image-data';
import { HTMLImageAttributes, ImageOptions } from '../../utils/models';
import { imageOptions } from '../../utils/plugin-options';

@Component({
  tag: 'selo-image-sharp',
  styleUrl: 'selo-image-sharp.css',
  shadow: false,
})
export class SeloImageSharp {
  @Prop() imageAttributes: HTMLImageAttributes = {
    src: 'assets/images/lucas-benjamin-wQLAGv4_OYs-unsplash.jpg',
    alt: 'unsplash',
    width: 400,
    height: 400,
  };
  @Prop({ mutable: true }) options: ImageOptions | any = !Build.isDev ? {} : imageOptions;

  async componentWillLoad() {
    console.log('in c');
    if (Build.isBrowser) {
      console.log('in b');
      console.log(this.options);
      await generateImageData(this.options);
    }
  }
  @Watch('imageAttributes')
  watchImageAttributes(_: never, newValue) {
    this.options.outputOptions.destFileName = this.options.inputOptions.srcFileName = this.imageAttributes.src
      .split('/')
      .pop();
    console.log(newValue);
  }

  render() {
    return (
      <Host>
        <selo-image src={this.imageAttributes.src} alt={this.imageAttributes.alt}></selo-image>
        <slot></slot>
      </Host>
    );
  }
}
