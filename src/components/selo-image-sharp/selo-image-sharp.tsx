import { Component, Host, h, Prop, Watch, State } from '@stencil/core';
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
  @Prop({ mutable: true }) options: ImageOptions | any = imageOptions;

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
    const {
      layout,
      images: {
        fallback: { type, src, srcset, sizes },
        sources,
      },
      width,
      height,
    } = this.imageProps;
    console.log(width, height, layout);
    return (
      <Host>
        <div>
          <p>LOrem</p>
          <br />
          <p>LOrem</p>
          <br />
          <p>LOrem</p>
          <br />
          <p>LOrem</p>
          <br />
          <p>LOrem</p>
          <br />
          <p>LOrem</p>
          <br />
          <p>LOrem</p>
          <br />
          <p>LOrem</p>
          <br />
          <p>LOrem</p>
          <br />
          <p>LOrem</p>
          <br />
          <p>LOrem</p>
          <br />
          <p>LOrem</p>
          <br />
          <p>LOrem</p>
          <br />
          <p>LOrem</p>
          <br />
          <p>LOrem</p>
          <br />
          <p>LOrem</p>
          <br />
          <p>LOrem</p>
          <br />
          <p>LOrem</p>
          <br />
          <p>LOrem</p>
          <br />
          <p>LOrem</p>
          <br />
          <p>LOrem</p>
          <br />

          <p>LOrem</p>
          <br />
        </div>
        <selo-image
          src={src}
          srcset={srcset}
          sizes={sizes}
          sources={sources}
          width={width}
          height={height}
          layout={layout}
          type={type}
        >
          <slot></slot>
        </selo-image>
      </Host>
    );
  }
}
