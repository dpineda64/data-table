---
sidebar: true
---
# Table Props
-------

## Columns
- type: `Array`
- element: `TableColumn`
- required: `true`

example:
```js
[
    {
        text: 'ID',
        value: 'ID',
        sortable: false,
    },
    {
        text: 'Name',
        value: 'Name',
        sortable: true,
        editable: false,
    },
    {
        text: 'Description',
        value: 'Description',
        sortable: false,
        editable: true,
    },
]
```

## orderBy
- type: `function`
- required: `false`
- params:
  - `value`: object property used to order the data
  - `order`: desc or asc


its not required if your columns does not contain any sortable columns

## selectable
- type `boolean`
- required `false`

Indicates if you can select data from the table


## pagination
- Type: [TablePagination](/DataTablePagination/TablePagination)
- Required: `false`

if is not present the table would not render the Pagination component

## onEdit
- Type: `function`
- Params: `{ newVal, propery, id }`
  - newVal: new value from edtied contenteditable
  - id: of edited data item
  - property: edited property of data item