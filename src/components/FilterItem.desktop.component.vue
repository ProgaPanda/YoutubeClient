<template>
  <div class="filter-item">
    <h5 class="filter-item__title">{{ name }}</h5>
    <ul class="filter-item__list">
      <li
        v-for="(option, index) in options"
        :key="index"
        :class="[
          'filter-item__list__item',
          { 'filter-item__list__item--active': selectedFilter === option },
        ]"
        @click="emitSelectedFilter(option)"
      >
        {{ option }}
        <button
          class="filter-item__list__item__remove-filter"
          v-if="selectedFilter === option && !defaultOption"
          @click="resetSelectedFilter"
        >
          x
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    options: Array,
    defaultOption: String,
  },
  data() {
    return {
      selectedFilter: this.defaultOption || '',
    };
  },

  methods: {
    emitSelectedFilter(filterValue) {
      this.selectedFilter = filterValue;
      this.$emit('selectFilter', this.generateFilterObject());
    },
    resetSelectedFilter(event) {
      event.stopPropagation();
      this.selectedFilter = '';
      this.$emit('selectFilter', this.generateFilterObject());
    },
    generateFilterObject() {
      return { type: this.name, value: this.selectedFilter };
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-item {
  margin-right: 3em;
  flex-grow: 1;

  &__title {
    font-weight: 500;
    padding-bottom: 1em;
    border-bottom: 1px solid $color-accent;
  }

  &__list {
    list-style-type: none;
    padding: 0;

    &__item {
      margin-top: 0.75em;
      color: $color-primary;
      cursor: pointer;

      &--active {
        color: $color-primary-200;
        font-weight: 500;
      }

      &__remove-filter {
        cursor: pointer;
        border: none;
        background: transparent;
      }
    }
  }
}
</style>
