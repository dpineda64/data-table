import { mount, shallowMount, Wrapper } from '@vue/test-utils';
import DataTable from '@/components/DataTable.vue';
import DataTableHeader from '@/components/DataTableHeader.vue';

import { columns, data } from './data';

describe('@components/DataTable', () => {
  let wrapper: Wrapper<any>;
  beforeAll(() => {
    wrapper = shallowMount(DataTable, {
      propsData: { columns },
    });
  });

  it('renders slot tableHeader fallback', () => {
    expect(wrapper.find(DataTableHeader).exists()).toBeTruthy();
  })
  it('renders data', () => {
    const wrapper = shallowMount(DataTable, {
      scopedSlots: {
        tableData: '<tr class="data-table__row">\
          <td v-if="props.item.selectable" class="select"> \
            <input type="checkbox" :value="props.item.ID" :selectModel="props.selectModel" @click="props.select"  /> \
          </td> \
          <td class="data-ID"> {{ props.item.ID }} </t> \
          <td class="data-Name"> {{ props.item.Name }} </td> \
          <td class="data-Description" contenteditable="true"> {{ props.item.Description }} </td> \
          <td class="data-Date"> {{ props.item.Date }} </td> \
          <td class="data-Amount"> {{ props.item.Amount }} </td> \
        </tr>'
      },
      propsData: { columns, data },
    });
    const tr = wrapper.findAll('.data-table__row');
    if (tr.exists()) {
      data.map((item: any, index: number) => {
        Object.keys(item).map((key: any) => {
          const td = tr.at(index).find(`.data-${key}`);
          expect(td.text()).toBe(item[key]);
        })
      })
    }
  });
})
