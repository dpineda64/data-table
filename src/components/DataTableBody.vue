<template>
  <tr>
    <td v-if="isSelectable">
      <input type="checkbox" v-model="selectedIds" @click="onSelect(id)" :value="id" />
    </td>
    <td
      v-for="(column, index) in columns"
      :key="index"
      :contenteditable="column['editable']"
      v-on="column['editable'] ? {
        blur: ({ target }) => edit({ property: column['value'], target, id  }) } : {}"
    >
      {{ record[column['value']] }}
    </td>
  </tr>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class DataTableBody extends Vue {
  @Prop({ required: true }) record!: DataRecord;

  @Prop({ required: true }) id!: string | number;

  @Prop({ required: true }) columns!: string[];

  @Prop() onSelect!: () => void;

  @Prop() isSelectable!: boolean;

  @Prop() selectedIds!: number[];

  @Prop() onEdit!: ({ newVal, property, id }: any) => void;

  edit({ property, target, id }: any) {
    const newVal = target.textContent;
    this.onEdit({ newVal, property, id });
  }
}
</script>
