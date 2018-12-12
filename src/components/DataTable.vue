<template>
  <div class="data-table">
    <slot name="filters" />
    <div class="data-table__content">
      <table>
        <thead>
          <tr>
            <th v-if="selectable">
              <input type="checkbox" @click="selectAll" />
            </th>
            <th v-for="(header, index) in headers" :key="index">
              <div class="data-table-sort">
                {{ header.text }}
                <a href="#" v-if="header.sortable"  @click="sort(header.value)">
                  <i class="material-icons">
                    {{ (desc[header.value]) ? 'arrow_upward' : 'arrow_downward' }}
                  </i>
                </a>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <slot
            v-for="item in data"
            :item="item"
            :selectable="selectable"
            :select="select"
            :selected={selectedIds}
          />
        </tbody>
      </table>
    </div>
    <slot name="pagination"  />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';


@Component
export default class DataTable extends Vue {
  @Prop({ required: true }) headers!: TableHeader[];

  @Prop() sortBy!: (value: string, order: boolean) => void;

  @Prop() selectable!: boolean;

  @Prop() data!: DataRecord[];

  desc: any = {};

  selectedIds: string[] = [];

  allSelected: boolean = false;

  pages: number[] = [];

  activePage: number = 1;

  perPage: number = 10;

  mounted() {
    const pageCount = Math.round(this.data.length / this.perPage);
    console.log(pageCount, this.data);
    // this.pages = [...Array(Math.round(this.data.length / this.perPage)).keys()];
  }

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

  sort(value: string) {
    this.desc = {
      [value]: !this.desc[value],
    };
    this.sortBy(value, this.desc[value]);
  }
}
</script>
<style lang="scss">
@import "@/assets/dataTable.scss";
</style>
