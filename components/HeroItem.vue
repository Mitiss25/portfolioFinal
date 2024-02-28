<script lang="ts" setup></script>

<template>
  <div data-grid="15" data-mouse="0.13" data-strength="0.15" class="hero">
    <img class="image" src="/images/TitreMael.png" alt="Hero Mael">
  </div>
</template>

<style scoped lang="scss">
  .hero {
    width: 100%;
    height: 50rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -5rem;

    .image {
      object-fit: contain;
      height: 100%;
      width: auto;

    }
  }
</style>
