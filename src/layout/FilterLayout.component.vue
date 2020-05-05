<template>
  <div>
    <transition name="slide">
      <div v-show="show" class="filter-container filter-container--desktop">
        <slot name="desktop"></slot>
      </div>
    </transition>

    <div class="filter-container filter-container--mobile">
      <slot name="mobile"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.filter-container {
  display: flex;

  &--desktop {
    @media screen and (max-width: $mobile-break-point) {
      display: none;
    }
  }

  &--mobile {
    padding-bottom: 1.5em;
    border-bottom: 1px solid $color-accent;

    @media screen and (min-width: $mobile-break-point) {
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
