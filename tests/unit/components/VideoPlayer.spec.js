import { shallowMount } from '@vue/test-utils';
import VideoPlayer from '@/components/VideoPlayer.component.vue';

describe('VideoPlayer', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(VideoPlayer, {
      propsData: {
        title: 'video title',
        views: '1000',
        reactions: { likes: 10, dislikes: 10 },
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
