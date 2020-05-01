<template>
  <div id="app">
    <Header />
    <main class="content">
      <router-view />
    </main>
  </div>
</template>
<script>
import Header from '@/layout/Header.component.vue';

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

.content {
  padding-top: 3em;
}
</style>
