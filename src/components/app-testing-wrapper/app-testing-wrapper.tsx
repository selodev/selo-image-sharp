import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-testing-wrapper',
  styleUrl: 'app-testing-wrapper.css',
  shadow: false,
 // assetsDirs: ['assets'],
})
export class AppTestingWrapper {
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
        <br /> <p>Lorem</p>
        <br /> <p>Lorem</p>
        <br /> <p>Lorem</p>
        <br /> <p>Lorem</p>
        <selo-img-sharp shouldLoad={true}></selo-img-sharp>
        <slot></slot>
      </Host>
    );
  }
}
