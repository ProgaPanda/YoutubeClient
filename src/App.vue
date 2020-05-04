<template>
  <div id="app">
    <Header />
    <MainLayout>
      <router-view />
    </MainLayout>
  </div>
</template>
<script>
import Header from '@/layout/Header.layout.vue';
import MainLayout from '@/layout/MainContent.layout.vue';

export default {
  components: {
    Header,
    MainLayout,
  },
};
</script>
<style lang="scss">
*,
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box;
  margin: 0;
  text-decoration: none;
}
</style>
