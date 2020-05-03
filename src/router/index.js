import Vue from 'vue';
import VueRouter from 'vue-router';
import Search from '../pages/Search.page.vue';
import Channel from '../pages/Channel.page.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/search',
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/channel/:id',
    name: 'Channel',
    component: Channel,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
