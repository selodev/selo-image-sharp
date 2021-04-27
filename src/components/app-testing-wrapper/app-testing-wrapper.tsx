import { Component, Host, h, State, Prop } from '@stencil/core';
import { ImageOptions } from '../../utils';

@Component({
  tag: 'app-testing-wrapper',
  styleUrl: 'app-testing-wrapper.css',
  shadow: false,
})
export class AppTestingWrapper {
  @Prop() src: string = 'assets/images/2020/01/apple-iphone-xs-new.jpg';
  @Prop() alt: string = 'Logo Name';
  @Prop() loading: 'auto' | 'lazy' | 'eager';
  @State() options: Promise<ImageOptions> | any;
  //@Prop({ mutable: true }) options: ImageOptions | any;

  async componentWillLoad() {
    try {
      const { imageOptionsBuilder } = await import('./plugin-options');
      let options = await imageOptionsBuilder(this.src, this.alt);
      this.options = options;
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    return (
      <Host>
        <br />
        <p>Lorem Impsum</p>
        <br />
        <p>Lorem Impsum</p>
        <br />
        <p>Lorem Impsum</p>
        <br />
        <p>Lorem Impsum</p>
        <br />
        <p>Lorem Impsum</p>
        <br />
        <p>Lorem Impsum</p>
        <br />
        <p>Lorem Impsum</p>
        <br />
        <p>Lorem Impsum</p>
        <br />
        <p>Lorem Impsum</p>
        <br />
        <p>Lorem Impsum</p>
        <br />
        <p>Lorem Impsum</p>
        <br />
        <p>Lorem Impsum</p>
        <br />
        <p>Lorem Impsum</p>
        <br />
        <p>Lorem Impsum</p>
        <br />
        <p>Lorem Impsum</p>
        <br />
        <p>Lorem Impsum</p>
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
