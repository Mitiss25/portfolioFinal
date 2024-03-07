<script setup>
  import  Sketch  from '~/assets/js/app.js';
  import { useElementBounding } from '@vueuse/core'

  const hero = ref();
  const image = ref();
  

  onMounted(() => {
    const containerNuxt = hero.value;
    const imgNuxt = image.value;
    const widthNuxt = hero.value.offsetWidth;
    const heightNuxt = hero.value.offsetHeight;
    new Sketch({dom: containerNuxt, pic: imgNuxt, width: widthNuxt, height: heightNuxt});
    
  });

</script>

<template>
  <div ref="hero" data-grid="15" data-mouse="0.13" data-strength="0.15" class="hero">
    <img ref="image" src="/images/TitreMael.png" alt=""/>
  </div>
</template>

<style scoped lang="scss">
  .hero {
    width: 100%;
    height: 40rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 .5rem 0;

    canvas {
      width: 100%;
      height: auto;
    }

    img {
      visibility: hidden;
	    pointer-events: none;
	    position: absolute;
      width: 100vw;
      height: auto;
    }
  }
</style>
