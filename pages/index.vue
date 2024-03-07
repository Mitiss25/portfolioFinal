
<script>
  export default {
    data() {
      return {

        projet2: {
          titre: 'Yugetaway',
          image: '/images/yugetaway_poster.jpg'
        },
        projet3: {
          titre: 'Nuview',
          image: '/images/nuview_poster.jpg'
        }
      }
    }
  }
</script>

<template>
  <div class="index">
    <HeaderItem/>
    <ClientOnly>
      <HeroItem/>
      <ShowcaseProjet/>
    </ClientOnly>
    <ProjectItem :titre="projet2.titre" :type="projet2.type" :composition="projet2.composition" :outils="projet2.outils" :date="projet2.date" :image="projet2.image" />
    <ProjectItem :titre="projet3.titre" :type="projet3.type" :composition="projet3.composition" :outils="projet3.outils" :date="projet3.date" :image="projet3.image" />
  </div>
</template>

<style scoped lang="scss">

  
  .index {
    margin: 0 .5rem;
  }
</style>
