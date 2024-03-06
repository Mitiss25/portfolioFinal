<script setup>
  import * as THREE from 'three';
  import GUI from 'lil-gui';
  import { useElementBounding } from '@vueuse/core'


// PB AVEC LA SIZE DU RENDER UTILISER REF
  const gui = new GUI();
  var test = 0;
  const image = ref();
  var img;
  const hero = ref();
    var width;
    var height;
   
 
  var time = 0;
  var settingsItem;
  var textureData;

  var renderer;
  const experience = ref();
  const scene = new THREE.Scene();
  var frustumSize = 1;
  
  var aspect = window.innerWidth / window.innerHeight;
  const camera = new THREE.OrthographicCamera(frustumSize / -2, frustumSize / 2, frustumSize / 2, frustumSize / -2, -1000, 1000);
  camera.position.set(0, 0, 2);
  scene.add(camera);

  var settingsItem;
  var mouse = {
      x: 0,
      y: 0,
      prevX: 0,
      prevY: 0,
      vX: 0,
      vY: 0
  }
  var isPlaying;
  var size;
  var texture;
  var material;
  var geometry;
  var plane;

  function mouseEvents() {
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX / width;
      mouse.y = e.clientY / height;
      mouse.vX = mouse.x - mouse.prevX;
      mouse.vY = mouse.y - mouse.prevY;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      // console.log('coucou je bouge');
    })
  }

  function render(){

    if (!isPlaying) return;
    time += 0.05;
    updateDataTexture()
    material.uniforms.time.value = time;
    requestAnimationFrame(render.bind(this));
    renderer.render(scene, camera);

  }

  function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
  }

  function updateDataTexture() {
    let data = textureData.image.data;
    for (let i = 0; i < data.length; i += 3) {
      data[i] *= settingsItem.relaxation;
      data[i+1] *= settingsItem.relaxation
    }

    let gridMouseX = size * mouse.x;
    let gridMouseY = size * (1 - mouse.y);
    let maxDist = size * settingsItem.mouse;
    let aspect = height / width;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j< size; j++) {
        let distance = ((gridMouseX - i) ** 2) / aspect + (gridMouseY - j) ** 2;
        let maxDistq = maxDist ** 2;
        if (distance < maxDistq) {
          let index = 3 * (i + size * j);
          let power = maxDist / Math.sqrt(distance);
          power = clamp(power, 0, 10);
          data[index]+= settingsItem.strength * 100 * mouse.vX * power;
          data[index + 1] -= settingsItem.strength * 100 * mouse.vY * power;
        }
      }
    }

    mouse.vX *= 0.9;
    mouse.vY *= 0.9;
    textureData.needsUpdate = true;
  }

  function settings(){
    settingsItem = {
      grid: 34,
      mouse: 0.25,
      strength: 1,
      relaxation: 0.9
    }

    gui.add(settingsItem, "grid", 2, 1000, 1).onFinishChange(() => {
      regenerateGrid()
    });
    gui.add(settingsItem, "mouse", 0, 1, 0.01);
    gui.add(settingsItem, "strength", 0, 1, 0.01);
    gui.add(settingsItem, "relaxation", 0, 1, 0.01);
  }

  function regenerateGrid(){
    size = settingsItem.grid;
    width = size;
    height =  size;
    const newSize = width * height;
    const data = new Float32Array(4*newSize);
    const color = new THREE.Color(0xffffff);

    const r  = Math.floor(color.r * 255);
    const g  = Math.floor(color.g * 255);
    const b  = Math.floor(color.b * 255);
    const a =  255;

    for (let i = 0; i < size; i++) {
      let r = Math.random() * 255 - 125;
      let r1 = Math.random() * 255 - 125;

      const stride = i * 4;

      data[stride] = r;
      data[stride + 1] = r1;
      data[stride + 2] = r;
      data[stride + 3] = a;
    }

    console.log('width : ' + width + ', height : ' + height);

    textureData = new THREE.DataTexture(data, width, height, THREE.RGBAFormat, THREE.FloatType);
    textureData.magFilter = textureData.minFilter = THREE.NearestFilter;
    console.log('textureData : ' + textureData);

    if(material) {
      material.uniforms.uDataTexture.value = textureData;
      material.uniforms.uDataTexture.value.needsUpdate = true;
    }
  }

  function addObjects() {
    regenerateGrid();
    let textureLoader = new THREE.TextureLoader();
    texture = textureLoader.load(img.src);
    console.log('img src : ' + img.src );
    console.log('texture : ' + texture);
    texture.needsUpdate = true;
    material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable"
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: {
          value: 0
        },
        resolution: {
          value: new THREE.Vector4()
        },
        uTexture: {
          value: texture
        },
        uDataTexture: {
          value: textureData
        }
      }, 
      vertexShader: `
      
      uniform float time;
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = vec4( position, 1.0 );
      }
      `,
      fragmentShader: `
      
      uniform float time;
      uniform sampler2D uDataTexture;
      uniform sampler2D uTexture;
      uniform vec4 resolution;
      varying vec2 vUv;

      void main()	{
        vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
        vec4 color = texture2D(uTexture,newUV);
        vec4 offset = texture2D(uDataTexture,vUv);
        gl_FragColor = vec4(vUv,0.0,1.);
        gl_FragColor = vec4(offset.r,0.,0.,1.);
        gl_FragColor = color;
        gl_FragColor = texture2D(uTexture,newUV - 0.02*offset.rg);
        // gl_FragColor = offset;

      }
      `,
    });

    geometry = new THREE.PlaneGeometry(1.8,1.8,1,1);
    plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
  }

  onMounted(() => {
    console.log('hero : ' + hero.value);
    width = hero.value.offsetWidth;
    height = hero.value.offsetHeight;
    img = image.value;
    console.log('image : ' + img)
    console.log('width 1 : ' + width);
    console.log('height 1 : ' + height);
    isPlaying = true;
    img.onload = () => {
      renderer = new THREE.WebGLRenderer({
        canvas: experience.value,
        antialias: true,
        alpha: true
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(width, height);
      renderer.setClearColor(0xeeeeee, 1);
      renderer.physicallyCorrectLights = true;
      renderer.outputEncoding = THREE.sRGBEncoding;
      settings();
      console.log('chargé !!! : ' + img.complete);
      addObjects();
      render();
      mouseEvents();
    }
    
  });


</script>

<template>
  <div ref="hero" data-grid="15" data-mouse="0.13" data-strength="0.15" class="hero">
    <canvas ref="experience"/>
    <img ref="image" src="/images/TitreMael.png" alt=""/>
  </div>
</template>

<style scoped lang="scss">
  .hero {
    width: 100%;
    height: 50rem;
    position: relative;
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -5rem;

    canvas {
      width: 100%;
      height: 100%;
    }

    img {
      visibility: hidden;
	    pointer-events: none;
	    position: absolute;
    }
  }
</style>
