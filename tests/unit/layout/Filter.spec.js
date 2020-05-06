import { shallowMount } from '@vue/test-utils';
import FilterContainer from '@/layout/Filter.layout.vue';

describe('FilterContainer', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(FilterContainer, {
      propsData: { show: true },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
