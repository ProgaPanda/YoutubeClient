<template>
  <div>
    <div v-for="(item, index) in searchItems" :key="index">
      <h2>{{ item.title }}</h2>
      <h3>{{ item.channelTitle }}</h3>
      <img :src="item.thumbnailURL" alt="video-thumbnail" />
    </div>
  </div>
</template>

<script>
import api from '@/shared/services/api/api.service';
import { mapSearchResponse } from './Search.page.service';

export default {
  data() {
    return {
      searchItems: [],
    };
  },
  methods: {
    search(searchParam) {
      api.search(searchParam).then((res) => {
        const { items } = mapSearchResponse(res.data);
        this.searchItems = items;
      });
    },
  },
  beforeRouteUpdate(to, from, next) {
    const searchParam = to.query.query;
    if (searchParam) {
      this.search(searchParam);
    }
    next();
  },
  mounted() {
    const searchParam = this.$route.query.query;
    if (searchParam) {
      this.search(searchParam);
    }
  },
};
</script>
