<template>
  <div class="search-page">
    <div class="search-page__actions">
      <p class="search-page__actions__search-count">
        About {{ resultsCount | formatNumber }} results
      </p>

      <button class="search-page__actions__filter-toggle" @click="toggleFilterActive">
        <FilterIcon class="search-page__actions__filter-toggle__icon" />Filter
      </button>
    </div>
    <div class="search-page__filters-container">
      <FilterLayout :show="isFilterActive">
        <template v-slot:desktop>
          <FilterItemDesktop
            name="Upload date"
            :options="['Last hour', 'Today', 'This week', 'This month']"
            @selectFilter="setFilter"
          />
          <FilterItemDesktop
            name="Type"
            :options="['Video', 'Channel', 'Playlist']"
            @selectFilter="setFilter"
          />
          <FilterItemDesktop
            name="Sort by"
            :options="['Relevance', 'Upload date', 'View count', 'Rating']"
            defaultOption="Relevance"
            @selectFilter="setFilter"
          />
        </template>

        <template v-slot:mobile>
          <FilterItemMobile
            name="Type"
            :options="['All', 'Video', 'Channel', 'Playlist']"
            defaultOption="All"
            @selectFilter="setFilter"
          />
          <FilterItemMobile
            name="Upload date"
            :options="['Any time', 'Today', 'This week', 'This month']"
            defaultOption="Any time"
            @selectFilter="setFilter"
          />
        </template>
      </FilterLayout>
    </div>

    <div v-if="isLoading" class="search-page__loading"><LoadingIcon /></div>

    <p v-else-if="isEmpty" class="search-page__empty-state">
      Nothing was found with this search parameter
    </p>

    <div
      class="search-page__content"
      v-infinite-scroll="loadMore"
      infinite-scroll-immediate-check="false"
      :infinite-scroll-disabled="isLoadingMore || isEmpty"
      infinite-scroll-distance="400"
      infinite-scroll-throttle-delay="800"
    >
      <MediaCard v-for="(item, index) in searchItems" :item="item" :key="item.id + index" />
    </div>

    <div v-if="isLoadingMore" class="search-page__loading--loading-more"><LoadingIcon /></div>
  </div>
</template>

<script>
import MediaCard from '@/components/MediaCard.component.vue';
import FilterLayout from '@/layout/Filter.layout.vue';
import FilterItemDesktop from '@/components/FilterItem.desktop.component.vue';
import FilterItemMobile from '@/components/FilterItem.mobile.component.vue';
import api from '@/shared/services/api/api.service';
import infiniteScroll from 'vue-infinite-scroll';
import { getSearchParam, mapSearchResponse, mapToFilterOptions } from '@/shared/services/mappers';
import { formatNumber } from '@/shared/services/helpers';
import LoadingIcon from '../../public/img/icons/svg/loading.icon.svg';
import FilterIcon from '../../public/img/icons/svg/filter.icon.svg';

export default {
  beforeRouteUpdate(to, from, next) {
    const searchParam = getSearchParam(to);
    const filterOptions = mapToFilterOptions(this.filters);
    if (searchParam) {
      this.search(searchParam, filterOptions);
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
    FilterLayout,
    FilterItemDesktop,
    FilterItemMobile,
    MediaCard,
    LoadingIcon,
    FilterIcon,
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
      // Filters state
      isFilterActive: false,
      filters: {
        Type: '',
        'Upload date': '',
        'Sort by': ' ',
      },
    };
  },

  methods: {
    search(searchParam, options = {}) {
      this.resetData();
      this.setLoading();
      api
        .search(searchParam, options)
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
      const filterOptions = mapToFilterOptions(this.filters);
      this.isLoadingMore = true;

      api
        .search(searchParam, { pageToken: this.nextPageToken, ...filterOptions })
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

    // Filter functions
    toggleFilterActive() {
      this.isFilterActive = !this.isFilterActive;
    },

    setFilter(filterObject) {
      const searchParam = getSearchParam(this.$route);
      const { type, value } = filterObject;
      const currentFilters = { ...this.filters };
      this.filters = {
        ...this.filters,
        [type]: value,
      };

      // Make sure filter value is different to prevent duplicate fetches
      if (filterObject.value !== currentFilters[filterObject.type] && searchParam) {
        this.isFilterActive = false;
        this.nextPageToken = null;
        const filterOptions = mapToFilterOptions(this.filters);
        api
          .search(searchParam, { pageToken: this.nextPageToken, ...filterOptions })
          .then((res) => {
            const { items, resultsCount, nextPageToken } = mapSearchResponse(res.data);
            if (items.length) {
              this.resetData();
              this.setData(items, resultsCount, nextPageToken);
            } else {
              this.resetData();
            }
          })
          .finally(() => {
            this.resetLoading();
          });
      }
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
      this.nextPageToken = null;
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
.search-page {
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
    color: $color-accent-800;
    margin-top: 50%;
    margin-left: 50%;
    transform: translate(-50%, -50%);
  }

  &__actions {
    display: flex;
    justify-content: space-between;
    margin-top: 3em;
    padding-bottom: 1em;
    border-bottom: 1px solid $color-accent;

    @media screen and (max-width: $mobile-break-point) {
      display: none;
    }

    &__filter-toggle {
      display: flex;
      align-items: flex-end;
      border: 0;
      color: $color-primary-200;
      background: transparent;
      font-size: 1em;
      cursor: pointer;

      &__icon {
        fill: $color-primary-200;
        margin-right: 0.5em;
      }
    }

    @media screen and (max-width: $mobile-break-point) {
      margin-top: 1em;
    }
  }

  &__filters-container {
    margin-top: 2em;
    margin-bottom: 5em;

    @media screen and (max-width: $mobile-break-point) {
      margin-top: 1em;
      margin-bottom: 2em;
    }
  }
}
</style>
