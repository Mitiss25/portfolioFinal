<script setup>
  import  Sketch  from '~/assets/js/app.js';

  const monConteneur = ref()
  const monImage = ref()

  onMounted(()=> {
    const containerNuxt = monConteneur.value;
    const imgNuxt = monImage.value;
    const widthNuxt = containerNuxt.offsetWidth;
    const heightNuxt = containerNuxt.offsetHeight;
    new Sketch({dom: containerNuxt, pic: imgNuxt, width: widthNuxt, height: heightNuxt});
  })
</script>

<template>
  <div ref="monConteneur" class="container-image">
    <img ref="monImage" class="projet1-image" src="/images/immersio_poster.jpg" alt="#"/>
    <div class="bouton-c"></div>
  </div>
</template>

<style scoped lang="scss">
.container-image {
  width: 100%;
  margin-top: -5rem;
  border-radius: 1rem;
  height: 50rem;
  overflow: hidden;
  position: relative;

  .projet1-image {
    visibility: hidden;
    pointer-events: none;
    position: absolute;
    width: 100vw;
    height: auto;
  }

  .bouton-c {
    width: 242px;
    height: 87px;
    background-color: rgb(236 233 228 / 27%);
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 1rem;
    transform: translate(-50%, -50%);
    z-index: 10;
  }

  canvas {
    height: auto;
    width: 100%;
    border-radius: 1rem;
  }
}
</style>
