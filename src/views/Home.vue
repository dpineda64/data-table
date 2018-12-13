<template>
  <div class="home content">
    <DataTable
      :columns="headers"
      :data="records"
      :orderBy="orderBy"
      :selectable="true"
      :pagination="{
        activePage,
        perPage,
        pages,
        nextPage: loadPage,
        prevPage: loadPage,
      }"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DataTable from '@/components/DataTable.vue';

import { Getter } from 'vuex-class';

@Component({
  components: {
    DataTable,
  },
})
export default class Home extends Vue {
  @Getter('activePage') activePage!: number;

  @Getter('pages') pages!: number;

  @Getter('paginated') records!: number;

  @Getter('perPage') perPage!: number;

  headers: TableColumns[] = [
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

  orderBy(value: string, order: string) {
    this.$store.commit('orderData', { value, order });
  }
}
</script>
