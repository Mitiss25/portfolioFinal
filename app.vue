<script setup>
  import Lenis from '@studio-freight/lenis'

  onMounted(() => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }) 
   
  

</script>

<template>
  <div>
    <NuxtPage/>
  </div>
</template>

<style lang="scss">

body {
  background-color: #FAF9F6;
}

body::-webkit-scrollbar {
  display: none;
}
</style>
