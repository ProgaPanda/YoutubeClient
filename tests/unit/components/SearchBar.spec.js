import { shallowMount } from '@vue/test-utils';
import SearchBar from '@/components/SearchBar.component.vue';

const $route = {
  path: '/',
  hash: '',
  query: { query: '' },
};

const $router = {
  push: jest.fn(),
};

describe('SearchBar', () => {
  it('Routes to the search view, with the correct search param', () => {
    const wrapper = shallowMount(SearchBar, {
      mocks: { $route, $router },
      stubs: ['SearchIcon'],
    });
    wrapper.setData({ searchParam: 'spongebob' });
    wrapper.vm.pushSearch();
    expect($router.push).toBeCalledWith({ path: 'search', query: { query: 'spongebob' } });
  });
});
