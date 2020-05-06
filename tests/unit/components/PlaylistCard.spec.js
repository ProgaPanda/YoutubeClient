import { shallowMount } from '@vue/test-utils';
import PlaylistCard from '@/components/PlaylistCard.component.vue';

describe('PlaylistCard', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(PlaylistCard, { stubs: ['PlaylistIcon', 'router-link'] });
    expect(wrapper.element).toMatchSnapshot();
  });
});
