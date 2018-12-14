---
title: Body Props
---

# Props

## record
- required: `true`
- Description: _a single entry of your data prop in DataTable_

## id
- Type: `string | number`
- Required: `true`
- Description: _how to identify the record_

## columns
- Type: `string[]`
- Required: `true`
- Description: _its the same prop pased to DataTable, used to iterate through the different properties of `record`_

## onSelect
- Type: `function`
- Params: `id`
- Description: _handles the selection of the record by id_

## onEdit
same as [onEdit](/DataTable/#onEdit)

## selectedIds
same as [isSelected](/DataTable/slots#tablebody-scoped)