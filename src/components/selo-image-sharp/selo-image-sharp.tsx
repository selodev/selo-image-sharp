import { Component, Host, h, Build, Prop, Watch, State } from '@stencil/core';
import { generateImageData } from '../../utils/image-data/generate-image-data';
import { HTMLImageAttributes, ImageOptions, ImageProps } from '../../utils/models';
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
  @State() imageProps: ImageProps;
  @Prop({ mutable: true }) options: ImageOptions | any = !Build.isBrowser
    ? {}
    : imageOptions;

  async componentWillLoad() {
    this.imageProps = await generateImageData(this.options);
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
        <selo-image src={this?.imageProps?.images?.fallback?.src}>
          {this?.imageProps &&
            this?.imageProps?.images?.sources?.map(({ srcset, type, sizes }) => (
              <source type={type} srcSet={srcset} sizes={sizes} />
            ))}
        </selo-image>
        <slot></slot>
      </Host>
    );
  }
}
