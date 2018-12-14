<template>
  <tr>
    <th v-if="isSelectable">
      <input type="checkbox" @click="onSelectAll" :checked="allSelected" />
    </th>
    <th class="data-table-header" v-for="(column, index) in columns" :key="index">
      <div class="data-table-sort">
        <span> {{ column.text }} </span>
        <a href="#" v-if="column.orderable"  @click="orderData(column.value)">
          <i class="material-icons">
            {{ (ordered[column.value] === 'asc') ? 'arrow_upward' : 'arrow_downward' }}
          </i>
        </a>
      </div>
    </th>
  </tr>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class TableHeader extends Vue {
  @Prop({ required: true }) columns!: TableColumn[];

  @Prop() isSelectable!: boolean;

  @Prop() onSelectAll!: () => void;

  @Prop() allSelected!: boolean;

  @Prop() orderData!: (value: string) => void;

  @Prop() ordered!: any[];
}
</script>
