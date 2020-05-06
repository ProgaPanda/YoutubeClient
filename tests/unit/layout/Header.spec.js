import { shallowMount } from '@vue/test-utils';
import HeaderLayout from '@/layout/Header.layout.vue';

describe('HeaderLayout', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(HeaderLayout, {
      stubs: ['router-link'],
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
