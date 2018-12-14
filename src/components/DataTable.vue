<template>
  <div class="data-table">
    <div class="data-table__content">
      <table>
        <thead>
          <slot name="tableHeader">
            <DataTableHeader
              :columns="columns"
              :onSelectAll="selectAll"
              :allSelected="allSelected"
              :orderData="orderData"
              :ordered="desc"
              :isSelectable="selectable"
            />
          </slot>
        </thead>
        <tbody>
          <slot
            name="tableBody"
            v-for="record in data"
            :record="record"
            :onSelect="select"
            :isSelected={selectedIds}
            :isSelectable="selectable"
          >
            <DataTableBody
              :id="record.ID"
              :record="record"
              :onSelect="select"
              :onEdit="onEdit"
              :isSelectable="selectable"
              :columns="columns"
              :selectedIds="selectedIds"
            />
          </slot>
        </tbody>
      </table>
    </div>
    <slot name="pagination" slot-scope="{pagination}" >
      <DataTablePagination
        v-if="pagination"
        :active="pagination.activePage"
        :nextPage="pagination.nextPage"
        :prevPage="pagination.prevPage"
        :pages="pagination.pages"
        :perPage="pagination.perPage"
      />
    </slot>
  </div>
</template>
<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Watch,
} from 'vue-property-decorator';
import DataTablePagination from './DataTablePagination.vue';
import DataTableBody from './DataTableBody.vue';
import DataTableHeader from './DataTableHeader.vue';

@Component({
  components: {
    DataTablePagination,
    DataTableBody,
    DataTableHeader,
  },
})
export default class DataTable extends Vue {
  @Prop({ required: true }) columns!: TableColumn[];

  @Prop() orderBy!: (value: string, order: string) => void;

  @Prop() selectable!: boolean;

  @Prop() data!: DataRecord[];

  @Prop() pagination!: TablePagination;

  @Prop() onEdit!: ({ newVal, property, id }: any) => void;

  @Watch('pagination.activePage')

  onPageChange(newVal: number, oldPage: number) {
    if (newVal !== oldPage) {
      this.allSelected = false;
      this.selectedIds = [];
    }
  }

  desc: any = [];

  selectedIds: string[] = [];

  allSelected: boolean = false;

  sortingBy: string[] = [];

  selectAll() {
    this.allSelected = !this.allSelected;
    if (this.allSelected) {
      this.data.map((record: DataRecord) => this.selectedIds.push(record.ID));
    } else {
      this.selectedIds = [];
    }
  }

  select(id: string) {
    const exists = this.data.find((record: DataRecord) => record.ID === id);
    if (exists && !this.selectedIds.includes(id)) {
      this.selectedIds.push(id);
    } else if (exists && this.selectedIds.includes(id)) {
      const index = this.selectedIds.indexOf(id);
      delete this.selectedIds[index];
    }
  }

  orderData(value: string) {
    this.desc = {
      ...this.desc,
      [value]: (this.desc[value] === 'asc') ? 'desc' : 'asc',
    };
    this.orderBy(value, this.desc[value]);
  }
}
</script>
