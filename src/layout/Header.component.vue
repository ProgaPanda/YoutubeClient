<template>
  <header class="header">
    <h3 class="header__logo">Youtube <span>client</span></h3>
    <div class="header__search-container">
      <SearchBar />
    </div>
  </header>
</template>

<script>
import SearchBar from '@/components/SearchBar.component.vue';

export default {
  components: {
    SearchBar,
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 3em;
  width: 100%;
  position: fixed;
  padding: 1em;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #cccccc;

  &__logo {
    text-transform: uppercase;
    font-weight: normal;
    span {
      font-weight: bold;
    }
  }

  &__search-container {
    flex-grow: 1;
  }
}
</style>
