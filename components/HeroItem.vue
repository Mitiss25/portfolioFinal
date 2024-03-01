<script setup>
  import * as THREE from 'three';
  import GUI from 'lil-gui';
  import { useWindowSize } from '@vueuse/core'

  const gui = new GUI();
  const cameraPosition = ref({ x: 1, y: 0, z: 5 });

  const {width, height} = useWindowSize()
  const aspectRatio = computed(()=> width.value / height.value)

  gui.add(cameraPosition.value, 'x', -10, 10);
  gui.add(cameraPosition.value, 'y', -10, 10);
  gui.add(cameraPosition.value, 'z', -10, 10);

 
  let renderer = null;
  const experience = ref(null)
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, aspectRatio.value, 0.1, 1000);
  camera.position.set(cameraPosition.value.x,cameraPosition.value.y,cameraPosition.value.z);
  scene.add(camera);

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(4,4),
    new THREE.MeshBasicMaterial({color: 0xff0000})
  )

  scene.add(plane);

  function setRenderer(){
    if(experience.value) {
      renderer = new THREE.WebGLRenderer({ 
        canvas: experience.value,
        antialias: true,
        alpha: true
      })
      renderer.setSize(width.value, height.value)
      renderer.render(scene, camera)
    }
  }

  function render(){
    time+=0.05;
    renderer.render(scene, camera);
    window.requestAnimationFrame(render.bind(this));

  }

  onMounted(() => {
    setRenderer();
  });

  watch(cameraPosition, () => {
    camera.position.set(cameraPosition.value.x, cameraPosition.value.y, cameraPosition.value.z);
    renderer.render(scene, camera); // Assurez-vous de rendre à nouveau la scène après avoir mis à jour la caméra
  }, { deep: true });

  watch(aspectRatio, () => {
    camera.aspect = aspectRatio.value
    camera.updateProjectionMatrix()
  })


</script>

<template>
  <div data-grid="15" data-mouse="0.13" data-strength="0.15" class="hero">
    <canvas ref="experience"/>
  </div>
</template>

<style scoped lang="scss">
  .hero {
    width: 100%;
    height: 50rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -5rem;

    canvas {
      position: absolute;

    }
  }
</style>
