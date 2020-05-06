import { shallowMount } from '@vue/test-utils';
import MainContentLayout from '@/layout/MainContent.layout.vue';

describe('MainContentLayout', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(MainContentLayout, {});

    expect(wrapper.element).toMatchSnapshot();
  });
});
