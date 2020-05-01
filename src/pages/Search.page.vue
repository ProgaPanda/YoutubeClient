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
      searchParam: this.$route.query.query,
      searchItems: [],
    };
  },
  methods: {
    search() {
      api.search(this.searchParam).then((res) => {
        const mappedResponse = mapSearchResponse(res.data);
        this.searchItems = mappedResponse.items;
      });
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.searchParam = to.query.query;
    if (this.searchParam) {
      this.search();
    }
    next();
  },
  mounted() {
    this.searchParam = this.$route.query.query;
    if (this.searchParam) {
      this.search();
    }
  },
};
</script>
