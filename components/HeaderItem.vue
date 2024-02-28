<script lang="ts" setup></script>

<template>
  <div class="header">
    <div class="row">
      <div class="row-c1">
        <p>Maël Aristide</p>
        <p>Créateur Indépendant</p>
      </div>
      <div class="row-c2">
        <div class="row-c2-c1">
          <a href="#">Travaux</a>
          <a href="#">A propos de moi</a>
          <a href="#">Me contacter</a>
        </div>
        <div class="row-c2-c2">
          <a href="#">Twitter</a>
          <a href="#">Github</a>
          <a href="#">Instagram</a>
          <a href="#">Dribble</a>
        </div>
      </div>
      <p>Paris, France</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "~/assets/css/main.scss";
  .header {
    width: 100%;
    padding: 2rem 0;
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
          gap: .6rem;
        }
      }
    }
  }
</style>
