import { Component, Host, h, State, Prop } from '@stencil/core';
import { ImageOptions, imageOptionsBuilder } from '../../utils';

@Component({
  tag: 'app-testing-wrapper',
  styleUrl: 'app-testing-wrapper.css',
  shadow: false,
})
export class AppTestingWrapper {
  @Prop() src: string = '/assets/images/NEWLOGO.png';
  @Prop() alt: string = 'Logo Name';
  @Prop() loading: 'auto' | 'lazy' | 'eager';
  @State() options: ImageOptions;

  async componentWillLoad() {
    let options = await imageOptionsBuilder(this.src, this.alt);
    this.options = options;
  }

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
        <selo-img-sharp
          src={this.src}
          alt={this.alt}
          loading={this.loading}
          options={this.options}
        ></selo-img-sharp>
        <slot></slot>
      </Host>
    );
  }
}
