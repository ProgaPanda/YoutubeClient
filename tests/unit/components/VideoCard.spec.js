import { shallowMount } from '@vue/test-utils';
import VideoCard from '@/components/VideoCard.component.vue';

describe('VideoCard', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(VideoCard, {
      stubs: ['router-link'],
      propsData: {
        id: 'id',
        title: 'title',
        channel: 'channel title',
        thumbnail: 'url',
        description: 'description',
        publishedAt: '3 years ago',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
