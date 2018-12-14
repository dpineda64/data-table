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
      paginated: [],
      pages: [],
      page: 1,
      perPage: 10,
      active: undefined,
    },
    error: undefined,
  },
  mutations: {
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
      let { records } = state.data;
      records = orderBy(records, key(value), order);
      state.data.records = records;
      state.data.paginated = paginateData(records, state.data.page, state.data.perPage);
    },
    loadPage(state: AppState, page: number) {
      state.data = {
        ...state.data,
        page,
        paginated: paginateData(state.data.records, page, state.data.perPage),
      };
    },
    searchBy(state: AppState, { by, text, range }: any) {
      const { records } = state.data;
      const filtered = records.filter((value: DataRecord) => {
        if (range) {
          return parseValue(value, by) > range.start && parseValue(value, by) < range.end;
        }
        return value[by].toLowerCase().includes(text.toLowerCase());
      });
      state.data = {
        ...state.data,
        pages: numberRange(filtered.length, state.data.perPage),
        paginated: paginateData(filtered, 1, state.data.perPage),
      };
    },
    clearFilters(state: AppState) {
      state.data.pages = numberRange(state.data.records.length, 10);
      state.data.paginated = paginateData(state.data.records, state.data.page, state.data.perPage);
    },
    update(state: AppState, data: any) {
      const { records } = state.data;
      const record = records.find((value: DataRecord) => value.ID === data.id);
      if (record && record[data.property] !== data.newVal) {
        const index = records.indexOf(record);
        state.data.records[index] = { ...record, [data.property]: data.newVal };
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
