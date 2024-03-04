<script setup>
  import * as THREE from 'three';
  import GUI from 'lil-gui';
  import { useWindowSize } from '@vueuse/core'

  // const gui = new GUI();
  const cameraPosition = ref({ x: 1, y: 0, z: 5 });

  const {width, height} = useWindowSize()
  const aspectRatio = computed(()=> width.value / height.value)
  var time = 0;

  // gui.add(cameraPosition.value, 'x', -100, 100);
  // gui.add(cameraPosition.value, 'y', -100, 100);
  // gui.add(cameraPosition.value, 'z', -100, 100);

  const mounted = ref(false);
  let renderer = null;
  const experience = ref(null)
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, aspectRatio.value, 0.1, 1000);
  camera.position.set(0,0,0);
  scene.add(camera);

  
  var textureLoader = new THREE.TextureLoader();
  var texture = textureLoader.load('/images/TitreMael.png');
  var material = new THREE.ShaderMaterial({
     

    uniforms: {

      uTime: {
        value: time
      },

      uTexture: {
        value: texture
      }
    
    },

    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4( position, 1.0 );
      }
    `,

    fragmentShader: `

      uniform float uTime;
      uniform float progress;
      uniform sampler2D uTexture;


      varying vec2 vUv;

      void main()	{
        gl_FragColor = texture2D(uTexture,vUv);
      }
    `
    });

  var plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1.8,1.8,1,1),
  material
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
    render();
    // mounted.value = true
  });

  // watch(cameraPosition, () => {
  //   camera.position.set(cameraPosition.value.x, cameraPosition.value.y, cameraPosition.value.z);
  //   renderer.render(scene, camera); // Assurez-vous de rendre à nouveau la scène après avoir mis à jour la caméra
  // }, { deep: true });

  // watch(aspectRatio, () => {
  //   camera.aspect = aspectRatio.value
  //   camera.updateProjectionMatrix()
  // })


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
      z-index: -1;

    }
  }
</style>
