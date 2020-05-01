<template>
  <div>
    <h3 v-if="isLoading">Loading...</h3>
    <h3 v-else-if="isEmpty">Nothing</h3>

    <div v-for="{ id, title, channelTitle, thumbnailURL } in searchItems" :key="id">
      <h2>{{ title }}</h2>
      <h3>{{ channelTitle }}</h3>
      <img :src="thumbnailURL" alt="video-thumbnail" />
    </div>
  </div>
</template>

<script>
import api from '@/shared/services/api/api.service';
import { getSearchParam, mapSearchResponse } from './Search.page.service';

export default {
  beforeRouteUpdate(to, from, next) {
    const searchParam = getSearchParam(to);
    if (searchParam) {
      this.search(searchParam);
    } else {
      this.resetItems();
    }
    next();
  },

  mounted() {
    const searchParam = getSearchParam(this.$route);
    if (searchParam) {
      this.search(searchParam);
    } else {
      this.resetItems();
    }
  },

  data() {
    return {
      searchItems: [],
      isEmpty: true,
      isLoading: false,
    };
  },

  methods: {
    search(searchParam) {
      this.resetItems();
      this.setLoading();
      api.search(searchParam).then((res) => {
        const { items } = mapSearchResponse(res.data);
        if (items.length) {
          this.setItems(items);
        } else {
          this.resetItems();
        }
        this.resetLoading();
      });
    },

    // Helper functions
    setItems(items) {
      this.searchItems = items;
      this.isEmpty = false;
    },
    resetItems() {
      this.isEmpty = true;
      this.searchItems = [];
    },
    setLoading() {
      this.isLoading = true;
    },
    resetLoading() {
      this.isLoading = false;
    },
  },
};
</script>
