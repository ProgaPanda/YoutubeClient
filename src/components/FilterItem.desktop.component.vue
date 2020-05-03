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
      this.$emit('selectFilter', { type: this.name, value: this.selectedFilter });
    },
    resetSelectedFilter(event) {
      event.stopPropagation();
      this.selectedFilter = '';
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
    border-bottom: 1px solid #dddddd;
  }

  &__list {
    list-style-type: none;
    padding: 0;

    &__item {
      margin-top: 0.75em;
      color: #858585;
      cursor: pointer;

      &--active {
        color: #000;
        font-weight: 500;
      }

      &__remove-filter {
        cursor: pointer;
        border: none;
        background: rgba($color: #000, $alpha: 0);
      }
    }
  }
}
</style>
