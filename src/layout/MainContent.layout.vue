<template>
  <main class="main-layout">
    <slot></slot>
  </main>
</template>

<style lang="scss">
.main-layout {
  width: 50%;
  padding-top: 3em;
  display: flex;
  transform: translateX(-50%);
  margin-left: 50%;

  @media screen and (max-width: $mobile-break-point) {
    width: 100%;
    padding: 0 1em;
  }
}
</style>
