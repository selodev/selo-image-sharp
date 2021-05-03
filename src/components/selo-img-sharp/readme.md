# selo-img-sharp



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type                          | Default     |
| --------- | --------- | ----------- | ----------------------------- | ----------- |
| `alt`     | `alt`     |             | `string`                      | `undefined` |
| `loading` | `loading` |             | `"auto" \| "eager" \| "lazy"` | `'lazy'`    |
| `options` | --        |             | `ImageOptions`                | `undefined` |
| `src`     | `src`     |             | `string`                      | `undefined` |


## Dependencies

### Used by

 - [app-selo-img-sharp-wrapper](../app-selo-img-sharp-wrapper)
 - [app-selo-img-sharp-wrapper-2](../app-selo-img-sharp-wrapper-2)

### Depends on

- [selo-img](../selo-img)
- [lazy-loader](../lazy-loader)

### Graph
```mermaid
graph TD;
  selo-img-sharp --> selo-img
  selo-img-sharp --> lazy-loader
  app-selo-img-sharp-wrapper --> selo-img-sharp
  app-selo-img-sharp-wrapper-2 --> selo-img-sharp
  style selo-img-sharp fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
