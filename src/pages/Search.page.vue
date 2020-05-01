<template>
  <div>
    hello
  </div>
</template>

<script>
import api from '@/shared/services/api/api.service';

export default {
  data() {
    return {
      searchParam: this.$route.query.query,
      searchItems: [],
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.searchParam = to.query.query;
    if (this.searchParam) {
      api.search(this.searchParam).then((res) => {
        this.searchItems = res;
      });
      console.log('this.searchItems: ', this.searchItems);
    }

    next();
  },
};
</script>
