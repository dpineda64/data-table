---
columns: [
    {
        text: 'ID',
        value: 'ID'
    },
    {
        text: 'Name',
        value: 'Name'
    },
    {
        text: 'Description',
        value: 'Description'
    },
]
data: [
    {
        ID: 'AI6W26kNX4',
        Name: 'Vue',
        Description: 'The Progressive JavaScript Framework'
    },
    {
        ID: 'mnPg3uAveH',
        Name: 'ReactJS',
    }
]
pagination: {
    activePage: 1,
}
---
# Slots
The DataTable component has a normal slot and 2 scoped-slots

## tableHeader
This goes under thead and if a its not used it fallbacks to [DataTableHeader](/DataTablePagination)

Default:
```jsx
<DataTable :columns="columns" :data="data" />
```
<data-table :columns="$page.frontmatter.columns" :data="$page.frontmatter.data" />

With Custom Slot:
```jsx
<DataTable :columns="columns" :data="data">
    <template slot="tableHeader">
        <tr>
            <th> Framework ID </th>
        </tr>
    </template>
</DataTable>
```
<data-table :columns="$page.frontmatter.columns" :data="$page.frontmatter.data">
<template slot="tableHeader">
        <tr>
            <th> Framework ID </th>
            <th> Framework Name </th>
            <th> Framework Description </th>
        </tr>
    </template>
</data-table>

## tableBody (scoped)
This goes under tbody and if a its not used it fallbacks to [DataTableBody](/DataTableBody)

### scoped props
- `record`: a single entry from your data prop in DataTable
- `onSelect`: handler function when select checkox is triggered
- `isSelected`: a model of array with the ids of the selected entry

With custom scope:
```jsx
<DataTable :columns="columns" :data="data">
    <template slot="tableBody" slot-scope="{record}">
        <tr>
            <td> Generic ID </td>
            <td> {{ record.Name }} </td>
            <td> {{ record.Description }} </td>
        </tr>
    </template>
</DataTable>
```
<data-table :columns="$page.frontmatter.columns" :data="$page.frontmatter.data">
<template slot="tableBody" slot-scope="{record}">
        <tr>
            <td> Generic ID </td>
            <td> {{ record.Name }} </td>
            <td> {{ record.Description }} </td>
        </tr>
    </template>
</data-table>

## pagination
This is the table pagination and fallbacks to [DataTableHeader](/DataTablePagination)

```jsx
<DataTable :columns="columns" :data="data" :pagination="pagination">
    <template slot="pagination" slot-scope="{pagination}">
        <div>
            active page: {{ activePage }}
            <button @click="NextPageHandler" > Next Page </button>
            <button @click="PrevPageHandler" > Prev Page </button>
        </div>
    </template>
</DataTable>
```
<data-table :columns="$page.frontmatter.columns" :data="$page.frontmatter.data">
<template slot="pagination">
    <div>
        active page: {{ $page.frontmatter.pagination.activePage }}
        <button> Next Page </button>
        <button > Prev Page </button>
    </div>
</template>
</data-table>