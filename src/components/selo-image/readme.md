# selo-image



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type     | Default     |
| -------- | --------- | ----------- | -------- | ----------- |
| `alt`    | `alt`     |             | `string` | `undefined` |
| `src`    | `src`     |             | `string` | `undefined` |


## Events

| Event            | Description                                 | Type                |
| ---------------- | ------------------------------------------- | ------------------- |
| `ionError`       | Emitted when the img fails to load          | `CustomEvent<void>` |
| `ionImgDidLoad`  | Emitted when the image has finished loading | `CustomEvent<void>` |
| `ionImgWillLoad` | Emitted when the img src has been set       | `CustomEvent<void>` |


## Shadow Parts

| Part      | Description |
| --------- | ----------- |
| `"image"` |             |


## Dependencies

### Used by

 - [selo-image-sharp](../selo-image-sharp)

### Graph
```mermaid
graph TD;
  selo-image-sharp --> selo-image
  style selo-image fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
