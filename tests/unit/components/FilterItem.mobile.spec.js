import { shallowMount } from '@vue/test-utils';
import FilterItemMobile from '@/components/FilterItem.mobile.component.vue';

describe('FilterItemMobile', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(FilterItemMobile, {
      propsData: {
        name: 'Type',
        options: ['All', 'Video', 'Channel', 'Playlist'],
        defaultOption: 'All',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders correct number of filter options', () => {
    const wrapper = shallowMount(FilterItemMobile, {
      propsData: {
        name: 'Type',
        options: ['All', 'Video', 'Channel', 'Playlist'],
        defaultOption: 'All',
      },
    });

    expect(wrapper.find('.filter-item__select').findAll('option')).toHaveLength(4);
  });
});
