<script lang="ts">

  export default {
    data() {
      return {
        projet1: {
          titre: 'Immersio',
          type: 'Projet personnel',
          composition: ['Identité visuelle','Animation site web','Poster pub','Maquette site web'],
          outils: ['Figma','Illustrator','Photoshop','After effect'],
          date: 'Décembre 2022',
          image: '/images/immersio_poster.jpg'
        },

        projet2: {
          titre: 'Yugetaway',
          type: 'Projet freelance',
          composition: ['Identité visuelle','Animation site web','Animation logo','Maquette site web'],
          outils: ['Figma','Illustrator','Photoshop','After effect'],
          date: '2023',
          image: '/images/yugetaway_poster.jpg'
        },
        projet3: {
          titre: 'Nuview',
          type: 'Projet universitaire',
          composition: ['Identité visuelle','Maquette site web'],
          outils: ['Figma','Illustrator','Photoshop','After effect'],
          date: '2023',
          image: '/images/nuview_poster.jpg'
        }
      }
    }
  }

</script>

<template>
  <div class="index">
    <HeaderItem/>
    <HeroItem/>
    <ProjectItem id="projetsuivi" :titre="projet1.titre" :type="projet1.type" :composition="projet1.composition" :outils="projet1.outils" :date="projet1.date" :image="projet1.image" />
    <ProjectItem :titre="projet2.titre" :type="projet2.type" :composition="projet2.composition" :outils="projet2.outils" :date="projet2.date" :image="projet2.image" />
    <ProjectItem :titre="projet3.titre" :type="projet3.type" :composition="projet3.composition" :outils="projet3.outils" :date="projet3.date" :image="projet3.image" />
  </div>
</template>

<style scoped lang="scss">
  .index {
    padding: 0 2rem;

    #projetsuivi {
      margin-top: -5rem;
    }
  }
</style>
