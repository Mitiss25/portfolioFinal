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
      <div class="column-row">
        <p>{{titre}}</p>
        <p>{{type}}</p>
        <div class="column-row-r">
          <div class="column-row-r-c1">
            <p v-for="(item, index) in composition" :key="(index)">{{ item }}</p>
          </div>
          <div class="column-row-r-c2">
            <p v-for="(outil, index2) in outils" :key="(index2)">{{ outil }}</p>
          </div>
        </div>
        <p>{{date}}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

@use "~/assets/css/main.scss";
  .projectItem {
    width: 100%;
    padding-bottom: 2rem;

    .column {
      display: flex;
      flex-direction: column;
      gap: 2.75rem;

      .column-c-image {
        object-fit: cover;

        .image {
          width: 100%;
          height: 700px;
          object-fit: cover;
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
