import Vue from 'vue';
import VueRouter from 'vue-router';
import Search from '../pages/Search.page.vue';
import Channel from '../pages/Channel.page.vue';
import Video from '../pages/Video.page.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/search',
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
  },
  {
    path: '/channel/:id',
    name: 'channel',
    component: Channel,
  },
  {
    path: '/video/:id',
    name: 'video',
    component: Video,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
