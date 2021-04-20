import {
  Component,
  Host,
  h,
  Element,
  Prop,
  State,
  Watch,
  EventEmitter,
  Event,
} from '@stencil/core';
import { Source } from '../../utils/models';

@Component({
  tag: 'selo-image',
  styleUrl: 'selo-image.css',
  shadow: true,
})
export class SeloImage {
  private io?: IntersectionObserver;
  @Element() el!: HTMLElement;
  @State() shoudLoad?: boolean;
  @State() loadError?: () => void;
  @Prop() src?: string;
  @Prop() alt?: string;
  @Prop() type: string;
  @Prop() srcset?: string;
  @Prop() sizes?: string;
  @Prop() sources: Array<Source>;

  @Watch('src')
  srcChanged() {
    this.addIO();
  }
  
  /** Emitted when the img src has been set */
  @Event() imgWillLoad!: EventEmitter<void>;
  /** Emitted when the image has finished loading */
  @Event() imgDidLoad!: EventEmitter<void>;
  /** Emitted when the img fails to load */
  @Event() imgError!: EventEmitter<void>;

  componentDidLoad() {
    this.addIO();
  }

  private addIO() {
    if (this.src === undefined) {
      return;
    }
    if (
      typeof (window as any) !== 'undefined' &&
      'IntersectionObserver' in window &&
      'IntersectionObserverEntry' in window &&
      'isIntersecting' in window.IntersectionObserverEntry.prototype
    ) {
      this.removeIO();
      this.io = new IntersectionObserver(data => {
        if (data[0].isIntersecting) {
          this.load();
          this.removeIO();
        }
      });
      this.io.observe(this.el);
    } else {
      // fall back to setTimeout for Safari and IE
      setTimeout(() => this.load(), 200);
    }
  }

  private removeIO() {
    if (this.io) {
      this.io.disconnect();
      this.io = undefined;
    }
  }

  private load() {
    this.loadError = this.onError;
    this.shoudLoad = true;
    this.imgWillLoad.emit();
  }

  private onLoad = () => {
    this.imgDidLoad.emit();
  };

  private onError = () => {
    this.imgError.emit();
  };

  render() {
    return (
      <Host>
        {this.srcset ? (
          <picture>
            <slot></slot>

            {this.sources &&
              this.sources.map(({ type, srcset, sizes }) => (
                <source type={type} srcSet={this.shoudLoad && srcset} sizes={sizes} />
              ))}

            {this.srcset && (
              <source
                type={this.type}
                srcSet={this.shoudLoad && this.srcset}
                sizes={this.sizes}
              />
            )}

            <img
              decoding="async"
              src={this.shoudLoad && this.src}
              alt={this.alt}
              onLoad={this.onLoad}
              onError={this.loadError}
              part="image"
            />
          </picture>
        ) : (
          <img
            decoding="async"
            src={this.shoudLoad && this.src}
            alt={this.alt}
            onLoad={this.onLoad}
            onError={this.loadError}
            part="image"
          />
        )}
      </Host>
    );
  }
}
