# selo-img-sharp



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute        | Description | Type                          | Default                        |
| ---------------- | ---------------- | ----------- | ----------------------------- | ------------------------------ |
| `alt`            | `alt`            |             | `string`                      | `undefined`                    |
| `loading`        | `loading`        |             | `"auto" \| "eager" \| "lazy"` | `'lazy'`                       |
| `nativeLoading`  | `native-loading` |             | `boolean`                     | `undefined`                    |
| `options`        | --               |             | `ImageOptions`                | `undefined`                    |
| `shouldLoad`     | `should-load`    |             | `boolean`                     | `undefined`                    |
| `sourceMetadata` | --               |             | `SourceMetadata`              | `undefined`                    |
| `src`            | `src`            |             | `string`                      | `'/assets/images/NEWLOGO.png'` |


## Dependencies

### Used by

 - [app-testing-wrapper](../app-testing-wrapper)

### Depends on

- [selo-img](../selo-img)
- [lazy-loader](../lazy-loader)

### Graph
```mermaid
graph TD;
  selo-img-sharp --> selo-img
  selo-img-sharp --> lazy-loader
  app-testing-wrapper --> selo-img-sharp
  style selo-img-sharp fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
