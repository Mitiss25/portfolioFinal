<script lang="ts">

export default {

  props: {
  titre: String,
  type: String,
  composition: Array,
  outils: Array,
  date: String,
  image: String,
  alt: String
  }

}

</script>

<template>
  <div class="projectItem">
    <div class="column">
      <div class="column-c-image">
        <img :src="(image)" :alt="(alt)" class="image">
      </div>
      <p>{{titre}}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">

@use "~/assets/css/main.scss";
  .projectItem {
    width: 628px;

    .column {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      .column-c-image {
        object-fit: cover;

        .image {
          width: 100%;
          height: 700px;
          object-fit: cover;
          border-radius: 1rem;

        }
      }
      .column-row {
        display: flex;
        justify-content: space-between;

        .column-row-r {
          display: flex;
          gap: 5rem;
          align-items: flex-start;

          .column-row-r-c1, .column-row-r-c2 {
            display: flex;
            flex-direction: column;
            gap: .6rem;
          }
        }
      }
    }
  }


</style>
