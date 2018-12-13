import { shallowMount, Wrapper } from '@vue/test-utils';
import DataPagination from '@/components/DataPagination.vue';

const pages: number[] = [...Array(Math.round(100 / 10)).keys()];
let active = 1;

const nextPage = () => { active = active + 1 };
const prevPage = () => { active = active - 1 };

describe('components/DataPagination', () => {
  let wrapper: Wrapper<any>;
  beforeAll(() => {
    wrapper = shallowMount(DataPagination, {
      propsData: { pages, active, nextPage, prevPage },
    });
  })
  it('renders empty page list', () => {
    const pages: number[] = [];
    wrapper.setProps({ pages })
    const pageList = wrapper.find('.pages-list').exists();
    expect(pageList).toBeFalsy();
  })
  it('renders complete page list', () => {
    wrapper.setProps({ pages });
    const pageList = wrapper.findAll('.pages-list');
    expect(pageList.length).toBe(pages.length);
  })
  it('triggers next page', () => {
    const nextBtn = wrapper.find('.next-page');

    nextBtn.trigger('click');

    wrapper.setProps({ active });

    expect(wrapper.props().active).toBe(active);
  })
});
