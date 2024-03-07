<script lang="ts" setup></script>

<template>
  <div class="header">
    <div class="row">
      <div class="row-c1">
        <p>maël aristide</p>
        <p>créateur indépendant</p>
      </div>
      <div class="row-c2">
        <div class="row-c2-c1">
          <a href="#">travaux</a>
          <a href="#">à propos de moi</a>
          <a href="#">me contacter</a>
        </div>
        <div class="row-c2-c2">
          <a href="#">twitter</a>
          <a href="#">github</a>
          <a href="#">instagram</a>
          <a href="#">dribble</a>
        </div>
      </div>
      <p>paris, france</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "~/assets/css/main.scss";
  .header {
    width: 100%;
    padding-top: .5rem;
    .row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      .row-c1{
        display: flex;
        gap: 5rem;  
        align-items: flex-start;
      }

      .row-c2 {
        display: flex;
        gap: 5rem;

        .row-c2-c1, .row-c2-c2 {
          display: flex;
          flex-direction: column;
          gap: .2rem;
        }
      }
    }
  }
</style>
