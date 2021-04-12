import { Component, Host, h, Element, Prop, State, Watch, EventEmitter, Event, Build } from '@stencil/core';

@Component({
  tag: 'selo-image',
  styleUrl: 'selo-image.css',
  shadow: false,
})
export class SeloImage {
  private io?: IntersectionObserver;
  @Element() el!: HTMLElement;
  @State() loadSrc?: string;
  @State() loadError?: () => void;
  @Prop() alt?: string;
  @Prop() src?: string;

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
    this.loadSrc = this.src;
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
          <slot></slot>
          <img
            decoding="async"
            src={Build.isBrowser ? this.loadSrc : this.src}
            alt={this.alt}
            onLoad={this.onLoad}
            onError={this.loadError}
            part="image"
          />
        </picture>
      </Host>
    );
  }
}
