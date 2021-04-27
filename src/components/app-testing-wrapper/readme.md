# app-testing-wrapper



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type                          | Default                                           |
| --------- | --------- | ----------- | ----------------------------- | ------------------------------------------------- |
| `alt`     | `alt`     |             | `string`                      | `'Logo Name'`                                     |
| `loading` | `loading` |             | `"auto" \| "eager" \| "lazy"` | `undefined`                                       |
| `src`     | `src`     |             | `string`                      | `'assets/images/2020/01/apple-iphone-xs-new.jpg'` |


## Dependencies

### Depends on

- [selo-img-sharp](../selo-img-sharp)

### Graph
```mermaid
graph TD;
  app-testing-wrapper --> selo-img-sharp
  selo-img-sharp --> selo-img
  selo-img-sharp --> lazy-loader
  style app-testing-wrapper fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
