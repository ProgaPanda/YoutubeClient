import { shallowMount } from '@vue/test-utils';
import MediaCard from '@/components/MediaCard.component.vue';
import VideoCard from '@/components/VideoCard.component.vue';
import ChannelCard from '@/components/ChannelCard.component.vue';
import PlaylistCard from '@/components/PlaylistCard.component.vue';

const getYearsAgo = () => 3;
describe('MediaCard', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(MediaCard, {
      propsData: {
        item: {
          date: new Date(),
        },
        mocks: { getYearsAgo },
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  describe('renders the correct media component', () => {
    it('Video', () => {
      const wrapper = shallowMount(MediaCard, {
        propsData: {
          item: {
            type: 'video',
            date: new Date(),
          },
        },
      });

      expect(wrapper.find(VideoCard).exists()).toBeTruthy();
      expect(wrapper.find(ChannelCard).exists()).toBeFalsy();
      expect(wrapper.find(PlaylistCard).exists()).toBeFalsy();
    });

    it('Channel', () => {
      const wrapper = shallowMount(MediaCard, {
        propsData: {
          item: {
            type: 'channel',
            date: new Date(),
          },
        },
      });

      expect(wrapper.find(ChannelCard).exists()).toBeTruthy();
      expect(wrapper.find(VideoCard).exists()).toBeFalsy();
      expect(wrapper.find(PlaylistCard).exists()).toBeFalsy();
    });

    it('Playlist', () => {
      const wrapper = shallowMount(MediaCard, {
        propsData: {
          item: {
            type: 'playlist',
            date: new Date(),
          },
        },
      });

      expect(wrapper.find(PlaylistCard).exists()).toBeTruthy();
      expect(wrapper.find(ChannelCard).exists()).toBeFalsy();
      expect(wrapper.find(VideoCard).exists()).toBeFalsy();
    });
  });
});
