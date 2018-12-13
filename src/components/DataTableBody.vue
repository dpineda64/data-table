<template>
  <tr>
    <td v-if="isSelectable">
      <input type="checkbox" v-model="selectedIds" @click="onSelect(id)" :value="id" />
    </td>
    <td v-for="(column, index) in columns" :key="index">
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

  @Prop() isSelected!: boolean;

  @Prop() selectedIds!: number[];
}
</script>
