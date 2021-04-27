import {
  Component,
  Host,
  h,
  State,
  Element,
  Event,
  EventEmitter,
  Build,
} from '@stencil/core';

@Component({
  tag: 'lazy-loader',
  styleUrl: 'lazy-loader.css',
  shadow: true,
})
export class LazyLoader {
  private io?: IntersectionObserver;
  @Element() el: HTMLElement;
  @State() shouldLoad: boolean;

  /** Emitted when the Lazyloader shouldLoad has been set */
  @Event() lazyLoaderWillLoad!: EventEmitter<void>;
  /** Emitted when the LazyLoader has finished loading */
  @Event() lazyLoaderDidLoad!: EventEmitter<void>;
  /** Emitted when the LazyLoader fails to load */
  @Event() lazyLoaderOnSlotChange!: EventEmitter<void>;
  /** Emitted when the LazyLoader fails to load */
  @Event() lazyLoaderDidDissconnect!: EventEmitter<void>;

  componentWillLoad() {
    this.addIO();
  }

  private addIO() {
    this.onWillLoad();
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
      !Build.isBrowser && this.load();
      // fall back to setTimeout for Safari and IE
      setTimeout(() => this.load(), 200);
    }
  }

  private removeIO() {
    if (this.io) {
      this.io.disconnect();
      this.io = undefined;
      this.onDidDisconnect();
    }
  }

  private load() {
    this.shouldLoad = true;
    this.onDidLoad();
  }

  private onWillLoad() {
    this.lazyLoaderWillLoad.emit();
  }
  private onDidLoad = () => {
    this.lazyLoaderDidLoad.emit();
  };

  private onSlotChange(_: Event) {
    this.lazyLoaderOnSlotChange.emit();
  }

  private onDidDisconnect = () => {
    this.lazyLoaderDidDissconnect.emit();
  };

  render() {
    return (
      <Host>
        {this.shouldLoad && (
          <slot onSlotchange={event => this.onSlotChange(event)}></slot>
        )}
      </Host>
    );
  }
}
