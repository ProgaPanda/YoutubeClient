<template>
  <div class="search-results">
    <div v-if="isLoading" class="search-results__loading"><LoadingIcon /></div>

    <p v-else-if="isEmpty" class="search-results__empty-state">
      Nothing was found with this search parameter
    </p>

    <div v-else class="search-results__actions">
      <p class="search-results__actions__search-count">
        About {{ resultsCount | formatNumber }} results
      </p>
    </div>

    <div
      class="search-results__content"
      v-infinite-scroll="loadMore"
      infinite-scroll-immediate-check="false"
      :infinite-scroll-disabled="isLoadingMore || isEmpty"
      :infinite-scroll-throttle-delay="800"
    >
      <MediaCard v-for="(item, index) in searchItems" :item="item" :key="item.id + index" />
    </div>

    <div v-if="isLoadingMore" class="search-results__loading--loading-more"><LoadingIcon /></div>
  </div>
</template>

<script>
import MediaCard from '@/components/MediaCard.component.vue';
import api from '@/shared/services/api/api.service';
import infiniteScroll from 'vue-infinite-scroll';
import { getSearchParam, mapSearchResponse } from '@/shared/services/mappers';
import { formatNumber } from '@/shared/services/helpers';
import LoadingIcon from '../../public/img/icons/svg/loading.icon.svg';

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
    LoadingIcon,
  },

  filters: {
    formatNumber,
  },
  directives: {
    infiniteScroll,
  },

  data() {
    return {
      searchItems: [],
      isEmpty: true,
      isLoading: false,
      isLoadingMore: false,
      resultsCount: 0,
      nextPageToken: null,
    };
  },

  methods: {
    search(searchParam) {
      this.resetData();
      this.setLoading();
      api
        .search(searchParam)
        .then((res) => {
          const { items, resultsCount, nextPageToken } = mapSearchResponse(res.data);
          if (items.length) {
            this.setData(items, resultsCount, nextPageToken);
          } else {
            this.resetData();
          }
        })
        .finally(() => {
          this.resetLoading();
        });
    },

    loadMore() {
      const searchParam = getSearchParam(this.$route);
      this.isLoadingMore = true;
      api
        .search(searchParam, { pageToken: this.nextPageToken })
        .then((res) => {
          const { items, resultsCount, nextPageToken } = mapSearchResponse(res.data);
          if (items.length) {
            this.setData(items, resultsCount, nextPageToken);
          }
        })
        .finally(() => {
          this.isLoadingMore = false;
        });
    },

    // Helper functions
    setData(newItems, count, nextPageToken) {
      this.searchItems = [...this.searchItems, ...newItems];
      this.nextPageToken = nextPageToken;
      if (count) {
        this.resultsCount = count;
      }
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
  width: 100%;

  &__loading {
    margin-top: 50%;
    margin-left: 50%;
    transform: translate(-50%, -50%);

    &--loading-more {
      margin: 2em 0;
    }
  }

  &__empty-state {
    width: fit-content;
    color: #808080;
    margin-top: 50%;
    margin-left: 50%;
    transform: translate(-50%, -50%);
  }

  &__actions {
    margin-top: 3em;
    padding-bottom: 1em;
    border-bottom: 1px solid #e7e7e7;

    @media screen and (max-width: 950px) {
      margin-top: 1em;
    }
  }

  &__content {
    margin-top: 3em;
  }
}
</style>
