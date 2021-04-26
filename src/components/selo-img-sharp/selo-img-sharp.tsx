import { Component, Host, h, Prop, State, Build } from '@stencil/core';
import { joinPaths } from '../../utils';
import { generateImageData } from '../../utils/image-data/generate-image-data';
import { ImageOptions, ImageProps } from '../../utils/models';
import { Sizer } from '../Sizer/Sizer';

@Component({
  tag: 'selo-img-sharp',
  styleUrl: 'selo-img-sharp.css',
  shadow: false,
})
export class SeloImageSharp {
  @Prop() src: string = '/assets/images/NEWLOGO.png';
  @Prop() alt?: string;
  @Prop() loading?: 'auto' | 'lazy' | 'eager' = 'lazy';
  @Prop({ mutable: true }) options: ImageOptions;

  @State() isNativeLoading: boolean;
  @State() shouldUseLazyLoader: boolean;
  @State() imageProps: ImageProps;

  async componentWillLoad() {
    if ('loading' in HTMLImageElement.prototype && this.loading) {
      console.log('isload');
      // supported in browser
      //this.isNativeLoading = true;
      //await this.fetchImageProps();
    } else {
      this.isNativeLoading = false;
      // fetch polyfill/third-party library
    }
    if (Build.isServer) {
      await this.serverSideGenerateImageData();
    }
  }

  async serverSideGenerateImageData() {
    try {
      if (this.options) {
        this.imageProps = await generateImageData(this.options);
      } else {
        throw 'Image options object is required.';
      }
    } catch (error) {
      console.error(error);
    }
  }

  async fetchImageProps() {
    try {
      const {
        sourceOptions: { srcPath, srcFileName, imagePropsDigestDir },
      } = this.options;
      const imagePropsFileName = srcFileName.split('.')[0] + '.json';
      const imagePropsFilePath = joinPaths([
        srcPath,
        imagePropsDigestDir,
        imagePropsFileName,
      ]);
      const res = await fetch(imagePropsFilePath);
      const imageProps = await res.json();
      this.imageProps = imageProps;
    } catch (error) {
      console.log(error);
    }
  }

  getImages(loading, imageProps: ImageProps) {
    const {
      layout,
      images: {
        fallback: { type, src, alt, srcset, sizes },
        sources,
      },
      presentation: { width, height },
    } = imageProps;
    return (
      <div>
        <Sizer layout={layout} width={width} height={height} />
        <selo-img
          src={src}
          alt={alt}
          type={type}
          loading={loading}
          srcset={srcset}
          sizes={sizes}
          sources={sources}
        />
      </div>
    );
  }

  render() {
    console.log(this.shouldUseLazyLoader, this.imageProps);
    return (
      <Host>
        {this.imageProps && this.isNativeLoading && this.loading ? (
          this.getImages(this.loading, this.imageProps)
        ) : (
          <lazy-loader
            onLazyLoaderDidLoad={async () => {
              console.log('lazy should load');
              await this.fetchImageProps();
              this.shouldUseLazyLoader = true;
            }}
          >
            {this.shouldUseLazyLoader && this.getImages(null, this.imageProps)}
          </lazy-loader>
        )}
      </Host>
    );
  }
}
