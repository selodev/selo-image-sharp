import { Component, Host, h, Prop, State } from '@stencil/core';
import { ImageOptions, ImageProps, Loading } from '../../utils/sharp/models';

@Component({
  tag: 'selo-img-sharp',
  styleUrl: 'selo-img-sharp.css',
  shadow: false,
})
export class SeloImageSharp {
  @Prop() src: string;
  @Prop() alt?: string;
  @Prop() loading?: Loading = 'lazy';

  @State() isNativeLoading: boolean;
  @State() shouldUseLazyLoader: boolean;
  @State() imageProps: ImageProps;
  @Prop() options: ImageOptions;

  async componentWillLoad() {
    if ('loading' in HTMLImageElement.prototype && this.loading) {
      // supported in browser
      await this.fetchImageProps();
      this.isNativeLoading = true;
    } else {
      this.isNativeLoading = false;
      // fetch polyfill/third-party library
    }
  }

  async fetchImageProps() {
    console.log('ingf');
    try {
      let {
        destinationOptions: { destPath, destFileName, imagePropsDigestDir },
      } = this.options;
      const js = `${destPath}/${imagePropsDigestDir}/${destFileName}.json`;
      const imagePropsResponse = await fetch(js);
      const imagePropsData = await imagePropsResponse.json();
      this.imageProps = imagePropsData;
    } catch (error) {
      console.log(error);
    }
  }

  renderImages(loading: Loading, imageProps: ImageProps) {
    const {
      images: {
        fallback: { type, src, alt, srcset, sizes },
        sources,
      },
    } = imageProps;
    return (
      <selo-img
        src={src}
        alt={alt}
        type={type}
        loading={loading}
        srcset={srcset}
        sizes={sizes}
        sources={sources}
      />
    );
  }

  render() {
    return (
      <Host>
        {this.imageProps && this.isNativeLoading && this.loading ? (
          this.renderImages(this.loading, this.imageProps)
        ) : (
          <lazy-loader
            onLazyLoaderDidLoad={async () => {
              console.log('on ;azy ld');
              await this.fetchImageProps();
              this.shouldUseLazyLoader = true;
            }}
          >
            {this.shouldUseLazyLoader && this.renderImages(null, this.imageProps)}
          </lazy-loader>
        )}
      </Host>
    );
  }
}
