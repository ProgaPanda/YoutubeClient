<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>
<script>
import Header from '@/components/Header.component.vue';

export default {
  components: {
    Header,
  },
};
</script>
<style lang="scss">
*,
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box;
  margin: 0;
}
</style>
