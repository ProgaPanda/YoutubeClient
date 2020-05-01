<template>
  <div class="search-results">
    <h3 v-if="isLoading">Loading...</h3>
    <h3 v-else-if="isEmpty">Nothing</h3>
    <div v-else class="search-results__actions">
      <p class="search-results__actions__search-count">
        About {{ resultsCount | formatNumber }} results
      </p>
    </div>
    <div class="search-results__content">
      <MediaCard v-for="item in searchItems" :item="item" :key="item.id" />
    </div>
  </div>
</template>

<script>
import MediaCard from '@/components/MediaCard.component.vue';
import api from '@/shared/services/api/api.service';
import { getSearchParam, mapSearchResponse } from '@/shared/services/mappers';
import { formatNumber } from '@/shared/services/helpers';

export default {
  beforeRouteUpdate(to, from, next) {
    const searchParam = getSearchParam(to);
    if (searchParam) {
      this.search(searchParam);
    } else {
      this.resetData();
    }
    next();
  },

  mounted() {
    const searchParam = getSearchParam(this.$route);
    if (searchParam) {
      this.search(searchParam);
    } else {
      this.resetData();
    }
  },

  components: {
    MediaCard,
  },

  filters: {
    formatNumber,
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
      this.resetData();
      this.setLoading();
      api
        .search(searchParam)
        .then((res) => {
          const { items, resultsCount } = mapSearchResponse(res.data);
          if (items.length) {
            this.setData(items, resultsCount);
          } else {
            this.resetData();
          }
        })
        .finally(() => {
          this.resetLoading();
        });
    },

    // Helper functions
    setData(items, count) {
      this.searchItems = items;
      this.resultsCount = count;
      this.isEmpty = false;
    },
    resetData() {
      this.isEmpty = true;
      this.resultsCount = 0;
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

<style lang="scss" scoped>
.search-results {
  &__actions {
    margin-top: 3em;
    padding-bottom: 1em;
    border-bottom: 1px solid #e7e7e7;
  }
  &__content {
    margin-top: 3em;
  }
}
</style>
