<template>
  <div class="search">
    <input
      class="search__input"
      type="search"
      placeholder="Search"
      v-model="searchParam"
      @keydown="handleKeyDownEnter"
    />
    <button class="search__button" type="button" @click="pushSearch"><SearchIcon /></button>
  </div>
</template>

<script>
import SearchIcon from '../../public/img/icons/svg/search.icon.svg';

export default {
  components: {
    SearchIcon,
  },
  data() {
    return {
      searchParam: '',
    };
  },
  methods: {
    pushSearch() {
      const searchParam = this.searchParam.trim();
      // Get last search param to avoid duplicate fetches
      const lastSearchParam = this.$route.query.query;
      if (searchParam && lastSearchParam !== searchParam) {
        this.$router.push({ path: '/search', query: { query: searchParam } });
      }
    },
    handleKeyDownEnter(event) {
      if (event.key === 'Enter') {
        this.pushSearch();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
  padding-left: 2em;

  &__input {
    flex-grow: 1;
    height: 3em;
    border: 0;
    padding: 0.75em;
    border-right: 0;
    color: $color-primary;
    background: $color-accent;

    &::placeholder {
      text-transform: uppercase;
      color: $color-accent-800;
    }

    &:focus {
      outline: 1px solid $color-secondary;
    }
  }

  &__button {
    height: 3em;
    padding: 0 1.5em;
    background: $color-accent;
    border: 0;
    border-left: 0;

    &:hover {
      background: $color-accent-200;
    }

    &:active {
      background: $color-accent-400;
    }
  }
}
</style>
