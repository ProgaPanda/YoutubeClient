<template>
  <header class="header">
    <div class="header__content">
      <router-link to="/" class="header__logo">Youtube<span>client</span></router-link>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3em;
  width: 100%;
  position: fixed;
  background: #fff;
  box-shadow: 0px 3px 14px 0px $color-accent;
  z-index: 1;

  @media screen and (max-width: $mobile-break-point) {
    position: relative;
  }

  &__content {
    display: flex;
    align-items: center;
    width: 50%;
    justify-content: space-between;
    margin-left: 50%;
    transform: translateX(-50%);

    @media screen and (max-width: $mobile-break-point) {
      width: 100%;
      padding: 0 1em;
      margin: 0;
      transform: none;
    }
  }

  &__logo {
    color: $color-primary;
    text-transform: uppercase;
    font-weight: normal;
    text-decoration: none;
    span {
      font-weight: bold;
    }
  }

  &__search-container {
    flex-grow: 1;
  }
}
</style>
