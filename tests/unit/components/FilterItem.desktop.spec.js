import { shallowMount } from '@vue/test-utils';
import FilterItemDesktop from '@/components/FilterItem.desktop.component.vue';

describe('FilterItemDesktop', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(FilterItemDesktop, {
      propsData: {
        name: 'Type',
        options: ['All', 'Video', 'Channel', 'Playlist'],
        defaultOption: 'All',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders correct number of filter options', () => {
    const wrapper = shallowMount(FilterItemDesktop, {
      propsData: {
        name: 'Type',
        options: ['All', 'Video', 'Channel', 'Playlist'],
        defaultOption: 'All',
      },
    });

    expect(wrapper.find('.filter-item__list').findAll('.filter-item__list__item')).toHaveLength(4);
  });
});
