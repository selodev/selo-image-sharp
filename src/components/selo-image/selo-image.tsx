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
  shadow: false,
})
export class SeloImage {
  private io?: IntersectionObserver;
  @Element() el!: HTMLElement;
  @State() shoudLoad?: boolean = false;
  @State() loadError?: () => void;
  @Prop() src?: string;
  @Prop() alt?: string;
  @Prop() type: string;
  @Prop() srcset?: string;
  @Prop() sizes?: string;
  @Prop() width?: any;
  @Prop() height?: any;
  @Prop() styles?: any;
  @Prop() sources: Array<Source>;
  @Prop() layout;

  @Watch('src')
  srcChanged() {
    this.addIO();
  }
  /** Emitted when the img src has been set */
  @Event() ionImgWillLoad!: EventEmitter<void>;
  /** Emitted when the image has finished loading */
  @Event() ionImgDidLoad!: EventEmitter<void>;
  /** Emitted when the img fails to load */
  @Event() ionError!: EventEmitter<void>;

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
    this.ionImgWillLoad.emit();
  }

  private onLoad = () => {
    this.ionImgDidLoad.emit();
  };

  private onError = () => {
    this.ionError.emit();
  };

  render() {
    return (
      <Host>
        <picture>
          {this.sources.map(({ type, srcset, sizes }) => (
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
            //width={this.width}
            //height={this.height}
            onLoad={this.onLoad}
            onError={this.loadError}
            part="image"
          />
        </picture>
      </Host>
    );
  }
}
