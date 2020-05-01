<template>
  <div class="search">
    <input
      class="search__input"
      type="search"
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
        this.$router.push({ path: 'search', query: { query: searchParam } });
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
  justify-content: center;

  &__input {
    width: 50%;
    font-size: 0.8em;
    height: 3em;
    border: 1px solid #d8d8d8;
    padding: 0.5em;
    border-right: 0;
  }

  &__button {
    height: 3em;
    font-size: 0.8em;
    padding: 0 1.5em;
    background: rgb(243, 243, 243);
    border: 1px solid #d8d8d8;
    border-left: 0;

    &:hover {
      background: #d8d8d8;
    }

    &:active {
      background: #d3d3d3;
    }
  }
}
</style>
