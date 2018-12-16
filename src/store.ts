/* eslint no-param-reassign: 0 */
/* eslint no-shadow: 0 */
import Vue from 'vue';
import Vuex from 'vuex';
import orderBy from 'lodash-es/orderBy';
import {
  parseValue,
  key,
  numberRange,
  paginateData,
} from '@/utils';

Vue.use(Vuex);

export default new Vuex.Store<AppState>({
  state: {
    data: {
      records: [],
      filteredRecords: [],
      paginated: [],
      pages: [],
      page: 1,
      perPage: 10,
      active: undefined,
    },
    isFilterActive: false,
    error: undefined,
  },
  mutations: {
    /**
     * Sets the state with the data from action: requestTableData
     * @param state
     * @param data
     */
    setTableData(state: AppState, data: Data) {
      state.data = {
        ...state.data,
        ...data,
        paginated: paginateData(data.records, state.data.page, state.data.perPage),
      };
    },
    error(state: AppState, error: Error) {
      state.error = error;
    },
    orderData(state: AppState, { value, order }: orderByParams) {
      const { data: { records, filteredRecords }, isFilterActive } = state;
      const orderedRecords = orderBy(isFilterActive ? filteredRecords : records, key(value), order);
      state.data.records = orderedRecords;
      state.data.paginated = paginateData(orderedRecords, state.data.page, state.data.perPage);
    },
    /**
     * @description loads new array of records depending on the requested page
     * @param state
     * @param page
     */
    loadPage(state: AppState, page: number) {
      state.data = {
        ...state.data,
        page,
        paginated: paginateData(state.data.records, page, state.data.perPage),
      };
    },
    /**
     * @description filters all state records and updates it with the records that
     * matchs the search input or range
     * @param state
     * @param SearchBy
     */
    searchBy(state: AppState, { by, text, range }: SearchBy) {
      const { records } = state.data;
      const filtered = records.filter((value: DataRecord) => {
        if (range) {
          return parseValue(value, by) > range.start && parseValue(value, by) < range.end;
        }
        return value[by].toLowerCase().includes(text.toLowerCase());
      });
      state.isFilterActive = true;
      state.data = {
        ...state.data,
        filteredRecords: filtered,
        pages: numberRange(filtered.length, state.data.perPage),
        paginated: paginateData(filtered, 1, state.data.perPage),
      };
    },
    /**
     * Resets page count and active page to defaults
     * @param state
     */
    clearFilters(state: AppState) {
      state.isFilterActive = false;
      state.data.filteredRecords = [];
      state.data.pages = numberRange(state.data.records.length, 10);
      state.data.paginated = paginateData(state.data.records, state.data.page, state.data.perPage);
    },
    /**
     * Updates record value based on property of updatedData
     * @param state
     * @param data
     */
    update(state: AppState, updatedData: DataRecord) {
      const { records } = state.data;
      const record = records.find((value: DataRecord) => value.ID === updatedData.id);
      if (record && record[updatedData.property] !== updatedData.newVal) {
        const index = records.indexOf(record);
        state.data.records[index] = { ...record, [updatedData.property]: updatedData.newVal };
      }
    },
  },
  getters: {
    activePage(state: AppState) {
      return state.data.page;
    },
    perPage(state: AppState) {
      return state.data.perPage;
    },
    records(state: AppState) {
      return state.data.records;
    },
    pages(state: AppState) {
      return state.data.pages;
    },
    paginated(state: AppState) {
      return state.data.paginated;
    },
  },
  actions: {
    async requestTableData({ commit }, page: number) {
      try {
        let result: any = await fetch(process.env.VUE_APP_API_URL!);
        result = await result.json();
        result.pages = numberRange(result.records.length, 10);
        commit('setTableData', result);
      } catch (e) {
        commit('error', e);
      }
    },
  },
});
