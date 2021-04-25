import { Component, Host, h, State } from '@stencil/core';

@Component({
  tag: 'app-testing-wrapper',
  styleUrl: 'app-testing-wrapper.css',
  shadow: false,
  // assetsDirs: ['assets'],
})
export class AppTestingWrapper {
  @State() shouldLoad;
  //onLazyLoaderDidLoad={() => (this.shouldLoad = true)}
  render() {
    return (
      <Host>
        <p>Lorem</p>
        <br />
        <p>Lorem</p>
        <br /> <p>Lorem</p>
        <br /> <p>Lorem</p>
        <br /> <p>Lorem</p>
        <br /> <p>Lorem</p>
        <br /> <p>Lorem</p>
        <br /> <p>Lorem</p>
        <br /> <p>Lorem</p>
        <br /> <p>Lorem</p>
        <br /> <p>Lorem</p>
        <br /> <p>Lorem</p>
        <br /> <p>Lorem</p>
        <br /> <p>Lorem</p>
        <br /> <p>Lorem</p>
        <br /> <p>Lorem</p>
        <br /> <p>Lorem</p>
        <br /> <p>Lorem</p>
        <br /> <p>Lorem</p>
        <lazy-loader
          onLazyLoaderDidLoad={() => {
            this.shouldLoad = true;
          }}
        >
          {this.shouldLoad && (
            <selo-img-sharp shouldLoad={this.shouldLoad}></selo-img-sharp>
          )}
        </lazy-loader>
        <slot></slot>
      </Host>
    );
  }
}
