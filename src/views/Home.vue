<template>
  <div class="home content">
    <div class="filters">
      hello
    </div>
    <DataTable :headers="headers" :data="records" :sortBy="sortBy" :selectable="true">
      <template slot="tableData" slot-scope="{item, selectable, select, selected}">
        <tr>
          <td v-if="selectable" class="select">
            <input
              type="checkbox"
              :value="item.ID"
              v-model="selected.selectedIds"
              @click="select(item.ID)"
            />
          </td>
          <td> {{ item.ID }} </td>
          <td> {{ item.Name }} </td>
          <td contenteditable="true"> {{ item.Description }} </td>
          <td> {{ new Date(item.Date).toLocaleString('en-GB', { timeZone: 'UTC' }) }} </td>
          <td> {{ item.Amount }} </td>
        </tr>
      </template>
      <template slot="pagination">
        <DataPagination
          :active="page"
          :nextPage="loadPage"
          :prevPage="loadPage"
          :pages="pages"
          :perPage="perPage"
        />
      </template>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DataTable from '@/components/DataTable.vue';
import DataPagination from '@/components/DataPagination.vue';

import { Getter } from 'vuex-class';

@Component({
  components: {
    DataTable,
    DataPagination,
  },
})
export default class Home extends Vue {
  @Getter('page') page!: number;

  @Getter('pages') pages!: number;

  @Getter('paginated') records!: number;

  @Getter('perPage') perPage!: number;

  headers: TableHeader[] = [
    {
      text: 'ID',
      value: 'ID',
      sortable: false,
    },
    {
      text: 'Name',
      value: 'Name',
      sortable: true,
    },
    {
      text: 'Description',
      value: 'Description',
      sortable: false,
    },
    {
      text: 'Transaction Date',
      value: 'Date',
      sortable: true,
    },
    {
      text: 'Transaction Amount',
      value: 'Amount',
      sortable: true,
    },
  ]

  mounted() {
    this.$store.dispatch('requestTableData', 1);
  }

  loadPage(page: string) {
    this.$store.commit('loadPage', page);
  }

  sortBy(value: string, order: boolean) {
    this.$store.commit('orderData', { value, order });
  }
}
</script>
