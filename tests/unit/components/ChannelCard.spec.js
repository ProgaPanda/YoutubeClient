import { shallowMount } from '@vue/test-utils';
import ChannelCard from '@/components/ChannelCard.component.vue';
import api from '@/shared/services/api/api.service';

const mockedApiResponse = {
  data: {
    items: [
      {
        kind: 'youtube#channel',
        id: 'UC29ju8bIPH5as8OGnQzwJyA',
        snippet: {
          title: 'Traversy Media',
          description:
            'Traversy Media features the best online web development and programming tutorials',
          thumbnails: {
            medium: {
              url: 'https://yt3.ggpht.com/thumb',
            },
          },
        },
        statistics: {
          subscriberCount: 1080000,
          videoCount: 784,
        },
        contentDetails: {
          relatedPlaylists: {
            likes: '',
            favorites: '',
            uploads: 'UU29ju8bIPH5as8OGnQzwJyA',
            watchHistory: 'HL',
            watchLater: 'WL',
          },
        },
      },
    ],
  },
};

// Mocking API layer
jest.mock('@/shared/services/api/api.service.js', () => ({
  getChannelDetails: jest.fn(() => Promise.resolve(mockedApiResponse)),
}));

describe('ChannelCard', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(ChannelCard, {
      propsData: {
        id: 'id',
        title: 'title',
        thumbnail: 'url',
        description: 'description',
      },
      stubs: ['router-link'],
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('calls api module with getChannelDetails after mount', () => {
    const CHANNEL_ID = 'MOCK_ID';
    shallowMount(ChannelCard, {
      propsData: {
        id: CHANNEL_ID,
      },
      stubs: ['router-link'],
    });

    expect(api.getChannelDetails).toBeCalledWith(CHANNEL_ID);
  });

  it('updates videos count and subscribers count after getChannelDetails request', (done) => {
    const wrapper = shallowMount(ChannelCard, {
      propsData: {
        id: 'id',
        title: 'title',
        thumbnail: 'url',
        description: 'description',
      },
      stubs: ['router-link'],
    });

    expect(wrapper.vm.subscribeCount).toEqual(0);
    expect(wrapper.vm.videosCount).toEqual(0);

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.subscribeCount).toEqual(1080000);
      expect(wrapper.vm.videosCount).toEqual(784);
      done();
    });
  });

  it('does not update videos count and subscribers count after getChannelDetails request: fail scenario', () => {
    api.getChannelDetails.mockImplementationOnce(() => Promise.reject(new Error()));

    const wrapper = shallowMount(ChannelCard, {
      stubs: ['router-link'],
    });
    expect(wrapper.vm.subscribeCount).toEqual(0);
    expect(wrapper.vm.videosCount).toEqual(0);

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.subscribeCount).toEqual(0);
      expect(wrapper.vm.videosCount).toEqual(0);
    });
  });
});
