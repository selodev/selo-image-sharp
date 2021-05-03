import { Component, Host, h } from '@stencil/core';
import Devices from '../app-selo-img-sharp-wrapper-2/Devices';

@Component({
  tag: 'app-test',
  styleUrl: 'app-test.css',
  shadow: true,
})
export class AppTest {
  render() {
    return (
      <Host>
        <app-selo-img-sharp-wrapper />
        <Devices />
        <slot></slot>
      </Host>
    );
  }
}
