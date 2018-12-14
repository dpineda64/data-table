import DataTable from '../../src/components/DataTable.vue';
import DataTableBody from '../../src/components/DataTableBody.vue';

export default ({ Vue }) => {
  Vue.component('data-table', DataTable);
  Vue.component('data-table-body', DataTableBody);
};
