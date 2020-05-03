import { shallowMount } from '@vue/test-utils';
import VideoCard from '@/components/VideoCard.component.vue';

describe('VideoCard', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(VideoCard);
    expect(wrapper.element).toMatchSnapshot();
  });
});