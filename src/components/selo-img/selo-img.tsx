import {
  Component,
  Host,
  h,
  Prop,
  State,
  Watch,
  EventEmitter,
  Event,
} from '@stencil/core';
import { Source } from '../../utils/models';

@Component({
  tag: 'selo-img',
  styleUrl: 'selo-img.css',
  shadow: false,
})
export class SeloImage {
  @Prop() loading: 'auto' | 'lazy' | 'eager';
  @Prop() src?: string;
  @Prop() alt?: string;
  @Prop() type: string;
  @Prop() srcset?: string;
  @Prop() sizes?: string;
  @Prop() sources: Array<Source>;

  @State() loadError?: () => void;

  @Watch('src')
  srcChanged() {
    this.onWillload();
  }

  /** Emitted when the img src has been set */
  @Event() imgWillLoad!: EventEmitter<void>;
  /** Emitted when the image has finished loading */
  @Event() imgDidLoad!: EventEmitter<void>;
  /** Emitted when the img fails to load */
  @Event() imgError!: EventEmitter<void>;

  componentWillLoad() {
    this.onWillload();
  }

  private onWillload() {
    this.loadError = this.onError;
    this.imgWillLoad.emit();
  }

  private onLoad = () => {
    this.imgDidLoad.emit();
  };

  private onError = () => {
    this.imgError.emit();
  };
  /**
   * @slot top - add content to the top of the image.
   * @slot bottom - add content to the bottom of the image.
   */

  render() {
    return (
      <Host>
        <slot name="top"></slot>

        {this.sources ? (
          <picture>
            <slot></slot>

            {this.sources.length &&
              this.sources.map(({ type, srcset, sizes }, index) => (
                <source type={type} srcSet={srcset} sizes={sizes} key={index} />
              ))}

            {this.srcset && (
              <source type={this.type} srcSet={this.srcset} sizes={this.sizes} />
            )}

            <img
              decoding="async"
              loading={this.loading}
              src={this.src}
              alt={this.alt}
              onLoad={this.onLoad}
              onError={this.loadError}
              part="image"
            />
          </picture>
        ) : (
          <img
            decoding="async"
            loading={this.loading}
            src={this.src}
            srcset={this.srcset}
            sizes={this.sizes}
            alt={this.alt}
            onLoad={this.onLoad}
            onError={this.loadError}
            part="image"
          />
        )}
        
        <slot name="bottom"></slot>
      </Host>
    );
  }
}
