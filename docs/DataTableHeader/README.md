---
title: Header Props
---

# Props
---------

## columns
- Type: `Array`
- Element: [TableColumn](#tablecolumn)
- Required: `true`

## onSelectAll
- Type: `function`
- Description: _click handler for selectAll checkbox if the table isSelectable_

## orderData
- Type: `function`
- Description: _if there is a record in data that is orderable an arrow icon would be rendered with this as click handler_

------
## TableColumn
it an interface of data structure declared in `src/@types/datatable.ts`
properties:
- `text`
  - type: `string`
  - required: `true`
- `value`:
  - `type`: `string`
  - `required`: `true`
- `sortable`:
  - Type: `boolean`
- `editable`:
  - Type: `boolean`