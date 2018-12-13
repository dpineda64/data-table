/* eslint no-param-reassign: 0 */
import Vue from 'vue';
import Vuex from 'vuex';
import orderBy from 'lodash-es/orderBy';
import range from 'lodash-es/range';
import { DateTime } from 'luxon';

Vue.use(Vuex);

function key(value: string): any {
  return (record: DataRecord) => {
    const Date = DateTime.fromISO(record[value]);
    if (Date.isValid) {
      return DateTime.fromISO(record[value]);
    }
    const asNumber = parseFloat(record[value]);
    return Number.isNaN(asNumber) ? record[value] : asNumber;
  };
}

function numberRange(to: number, perPage: number): number[] {
  return range(1, 1 + (Math.floor(to / perPage)));
}

function paginateData(data: any, page: number, perPage: number) {
  return data.slice((page - 1) * perPage).slice(0, perPage);
}

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
