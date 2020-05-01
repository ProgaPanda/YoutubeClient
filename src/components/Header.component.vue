<template>
  <header class="header">
    <h3 class="header__logo">Youtube <span>client</span></h3>
    <div class="header__search-container">
      <Search />
    </div>
  </header>
</template>

<script>
import Search from './Search.component.vue';

export default {
  components: {
    Search,
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
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
