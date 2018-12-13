import { shallowMount, Wrapper } from '@vue/test-utils';
import DataTable from '@/components/DataTable.vue';

import { headers, data } from './data';

describe('@components/DataTable', () => {
  let wrapper: Wrapper<any>;
  beforeAll(() => {
    wrapper = shallowMount(DataTable, {
      propsData: { headers }
    });
  });

  it('renders headers', () => {
    const ths = wrapper.findAll('.data-table-header');
    headers.map((header, index) => {
      const hd = ths.at(index).find('.data-table-sort').find('span');
      expect(hd.text()).toBe(header.text);
    });
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
      propsData: { headers, data },
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
