import { Component, Host, h, State, Prop } from '@stencil/core';
import { ImageOptions } from '../../utils';
import { Loading } from '../../utils/models';

@Component({
  tag: 'app-selo-img-sharp-wrapper',
  styleUrl: 'app-selo-img-sharp-wrapper.css',
  shadow: false,
})
export class AppSeloImgSharpWrapper {
  @Prop() src: string = 'assets/images/2020/01/apple-iphone-xs-new.jpg';
  @Prop() alt: string = 'Logo Name';
  @Prop() loading: Loading;
  @State() options: ImageOptions;
  //@Prop({ mutable: true }) options: ImageOptions | any;

  async componentWillLoad() {
    try {
      const { imageOptionsBuilder } = await import('./imega-options-builder');
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
        {this.options && (
          <selo-img-sharp
            src={this.src}
            alt={this.alt}
            loading={this.loading}
            options={this.options}
          ></selo-img-sharp>
        )}
        <slot></slot>
      </Host>
    );
  }
}
