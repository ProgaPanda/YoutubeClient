<template>
  <transition name="slide">
    <div>
      <div class="filter-container filter-container--desktop">
        <slot name="desktop"></slot>
      </div>

      <div class="filter-container filter-container--mobile">
        <slot name="mobile"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    name: String,
  },
};
</script>

<style lang="scss" scoped>
.filter-container {
  display: flex;

  &--desktop {
    @media screen and (max-width: 950px) {
      display: none;
    }
  }

  &--mobile {
    padding-bottom: 1.5em;
    border-bottom: 1px solid #e7e7e7;

    @media screen and (min-width: 950px) {
      display: none;
    }
  }
}

// Transition classes
.slide-enter-active {
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}

.slide-enter-to,
.slide-leave {
  max-height: 200px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>
