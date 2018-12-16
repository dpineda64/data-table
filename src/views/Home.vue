<template>
  <div class="home content">
    <div class="filters">
      <div class="filter search-by">
        <select name="searchBy" v-model="filters.by">
          <option :value="undefined" disabled> Select Property </option>
          <option v-for="(header, index) in headers" :key="index" :value="header.value">
            {{ header.text }}
          </option>
        </select>
        <input
          type="search"
          placeholder="Search"
          @keyup="onSearch"
          v-model="filters.text"
          :disabled="filters.by === undefined"
        />
        <span class="clear" v-if="filters.text != ''">
          <button @click="clearFilters"> clear </button>
        </span>
      </div>
      <div class="filter" data-label="Filter between dates">
        <input type="date" v-model="filters.dateRange.start">
        <input type="date" v-model="filters.dateRange.end">
        <span class="clear" v-if="hasRange(filters.dateRange)">
          <button @click="clearFilters"> clear </button>
        </span>
      </div>
      <div class="filter amounts" data-label="Filter between amount">
        <input type="number" placeholder="From" v-model="filters.amountRange.start" />
        <input type="number" placeholder="To" v-model="filters.amountRange.end" />
        <span class="clear" v-if="hasRange(filters.amountRange)">
          <button @click="clearFilters"> clear </button>
        </span>
      </div>
    </div>
    <DataTable
      :columns="headers"
      :data="records"
      :orderBy="orderBy"
      :selectable="true"
      :onEdit="onEdit"
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
import { Component, Vue, Watch } from 'vue-property-decorator';
import DataTable from '@/components/DataTable.vue';

import { Getter } from 'vuex-class';
import { DateTime } from 'luxon';

function defaultFilters(): Filters {
  return {
    by: undefined,
    text: '',
    dateRange: {
      start: '',
      end: '',
    },
    amountRange: {
      start: '',
      end: '',
    },
    amount: [],
    changed: false,
  };
}

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

  @Watch('filters.by')

  onChangeSearch(oldVal: string, newVal: string) {
    if (oldVal !== newVal && this.filters.text !== '') {
      this.onSearch();
    }
  }

  @Watch('filters.dateRange', { deep: true })

  onChangeDate(newVal: FilterRange, { start, end }: FilterRange) {
    const startDate = DateTime.fromString(newVal.start, 'yyyy-dd-mm');
    const endDate = DateTime.fromString(newVal.end, 'yyyy-dd-mm');
    if (startDate.isValid && endDate.isValid) {
      this.$store.commit('searchBy', { by: 'Date', range: { start: startDate.toISODate(), end: endDate.toISODate() } });
    }
  }

  @Watch('filters.amountRange', { deep: true })

  onChangeAmount(newVal: FilterRange, { start, end }: FilterRange) {
    const startNumber = parseFloat(newVal.start);
    const endNumber = parseFloat(newVal.end);
    if (!Number.isNaN(startNumber) && !Number.isNaN(endNumber) && !this.filters.changed) {
      this.$store.commit('searchBy', { by: 'Amount', range: { start: startNumber, end: endNumber } });
    }
  }

  headers: TableColumn[] = [
    {
      text: 'ID',
      value: 'ID',
    },
    {
      text: 'Name',
      value: 'Name',
      orderable: true,
    },
    {
      text: 'Description',
      value: 'Description',
      editable: true,
    },
    {
      text: 'Transaction Date',
      value: 'Date',
      orderable: true,
    },
    {
      text: 'Transaction Amount',
      value: 'Amount',
      orderable: true,
    },
  ]

  filters: Filters = defaultFilters();

  // Once Home is mounted dispatch action to request data
  mounted() {
    this.$store.dispatch('requestTableData', 1);
  }

  /**
   * @function loadPage
   * @param {number} page
   * @description commit a new store mutation to load page based on param page
   */
  loadPage(page: number) {
    this.$store.commit('loadPage', page);
  }

  /**
   * @function orderBy
   * @param {string} value - object property used to order the data
   * @param {string} order - desc or asc
   */

  orderBy(value: string, order: string) {
    this.$store.commit('orderData', { value, order });
  }
  /**
   * @function onSearch
   * @description calls searchBy mutation with data of model search
   * search.by and search.text
   */

  onSearch() {
    const { by, text } = this.filters;
    this.$store.commit('searchBy', { by, text });
  }

  /**
   * @function clearFilters
   * @description restore filters model to default filters
   */
  clearFilters() {
    this.filters = defaultFilters();
    this.$store.commit('clearFilters');
  }

  /**
   * @function onEdit
   * @param { string } data -from contenteditable td
   */
  onEdit(data: string) {
    this.$store.commit('update', data);
  }

  /**
   * @function hasRange
   * @param { FilterRange } range
   * @description checks if
   */
  hasRange = (range: FilterRange) => (range.start || range.end);
}
</script>
