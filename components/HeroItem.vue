<script setup>
  import  Sketch  from '~/assets/js/app.js';

const monConteneur = ref()
  const monImage = ref()
  const imageLoaded = ref(false);
  const componentMounted = ref(false);
  var containerNuxt;
  var imgNuxt;
  var widthNuxt;
  var heightNuxt;

  watchEffect(() => {
    if (imageLoaded.value && componentMounted.value) {
      new Sketch({dom: containerNuxt, pic: imgNuxt, width: widthNuxt, height: heightNuxt});
    }
  });

  function handleImageLoad() {
    imageLoaded.value = true;
  }


  onMounted(()=> {
      componentMounted.value = true;
      containerNuxt = monConteneur.value;
      imgNuxt = monImage.value;
      widthNuxt = containerNuxt.offsetWidth;
      heightNuxt = containerNuxt.offsetHeight;
  })

</script>

<template>
  <div ref="monConteneur" data-grid="15" data-mouse="0.13" data-strength="0.15" class="hero">
    <img ref="monImage" @load="handleImageLoad"  src="/images/TitreMael.png" alt=""/>
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
