<template>
  <div class="filter-item">
    <select class="filter-item__select" v-model="selectedFilter" @change="emitSelectedFilter">
      <option v-for="(option, index) in options" :key="index">
        {{ option }}
      </option>
    </select>
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
    emitSelectedFilter() {
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
  margin-right: 1em;
  flex-grow: 1;

  &__select {
    width: 100%;
    font-size: 1.1em;
    padding: 0.5em;
    background: $color-accent;
    border: 0;
  }
}
</style>
