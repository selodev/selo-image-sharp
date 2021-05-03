import { h } from '@stencil/core';
const devices = [
  {
    href: 'iphone-repair-san-diego/6g-6-plus',
    src: 'assets/images/iphone-6.png',
    alt: 'iphone 6',
    figCaption: 'iPhone 6G and 6 Plus',
  },
  {
    href: 'iphone-repair-san-diego/6s-6s-plus',
    src: 'assets/images/iphone-6.png',
    alt: 'iphone 6',
    figCaption: 'iPhone 6S and 6S Plus',
  },
  {
    href: 'iphone-repair-san-diego/iphone-7-screen-replacement',
    src: 'assets/images/iphone7.png',
    alt: 'iphone 7 screen replacement',
    figCaption: 'iPhone 7 and 7 Plus',
  },
  {
    href: 'iphone-repair-san-diego/iphone-8-and-8-plus',
    src: 'assets/images/iphone8.png',
    alt: 'iphone 8 battery replacment',
    figCaption: 'iPhone 8 and 8 Plus',
  },
  {
    href: 'iphone-repair-san-diego/iphone-x',
    src: 'assets/images/iphonex.png',
    alt: 'iphone x',
    figCaption: 'iPhone X Repair',
  },
  {
    href: 'iphone-repair-san-diego/iphone-xs-plus-2',
    src: 'assets/images/apple-iphone-xs-new.png',
    alt: 'iphone xs',
    figCaption: 'iPhone XS and XS Max Repair',
  },
  {
    href: 'iphone-repair-san-diego/iphone-xr',
    src: 'assets/images/iphonexr.png',
    alt: 'iphone xr screen repair',
    figCaption: 'iPhone XR Repair',
  },
  {
    href: 'iphone-repair-san-diego/iphone-11-repair',
    src: 'assets/images/iphone-11-repair-1.png',
    alt: 'iphone 11 repair',
    figCaption: 'iPhone 11 Repair',
  },
  {
    href: 'iphone-repair-san-diego/iphone-11-pro-repair',
    src:
      'assets/images/iphone-11-pro-isquad-repair-iphone-repair-san-diego-1.png',
    alt: 'iphone 11 pro',
    figCaption: 'iPhone 11 Pro Repair',
  },
  {
    href: 'iphone-repair-san-diego/iphone-11-pro-max-repair',
    src: 'assets/images/iphone-11-pro-max.png',
    alt: 'iphone 11 pro max',
    figCaption: 'iPhone 11 Pro Max Repair',
  },
  {
    href: 'iphone-repair-san-diego/2020-iphone-se-repair',
    src: 'assets/images/iphone_se_2020_roundup_header-1-1.png',
    alt: '',
    figCaption: '2020 iPhone SE Repair',
  },
  {
    href: 'iphone-repair-san-diego/iphone-12-repair',
    src: 'assets/images/iphone-12.png',
    alt: '',
    figCaption: 'iPhone 12 Repair',
  },
  {
    href: 'iphone-repair-san-diego/iphone-12-mini-repair',
    src: 'assets/images/iphone-12-mini.png',
    alt: 'iphone 11 pro',
    figCaption: 'iPhone 12 Mini Repair',
  },
  {
    href: 'iphone-repair-san-diego/iphone-12-pro-repair',
    src: 'assets/images/iphone-12-pro.png',
    alt: 'iphone 11 pro max',
    figCaption: 'iPhone 12 Pro Repair',
  },
  {
    href: 'iphone-repair-san-diego/iphone-12-pro-max-repair',
    src: 'assets/images/iphone-12-pro-max.png',
    alt: '',
    figCaption: 'iPhone 12 Pro Max Repair',
  },
];
export default () => (
  <ion-row>
    {devices.map(({ href, src, alt, figCaption }) => (
      <ion-col key={src} sizeMd='3'>
        <figure>
          <a href={href}>
            <app-selo-img-sharp-wrapper-2  src={src} alt={alt} />
          </a>
          <figcaption>
            <strong>
              <a href={href}>{figCaption}</a>
            </strong>
          </figcaption>
        </figure>
      </ion-col>
    ))}
  </ion-row>
);
