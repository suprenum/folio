<template>
  <div>
    <canvas class="webgl"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default {
  name: 'AiuBuilding',
  data() {
    return {}
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.canvas = document.querySelector('canvas.webgl')
      this.scene = new THREE.Scene()

      /**
       * Loaders
       */
      // Texture loader
      this.textureLoader = new THREE.TextureLoader()

      // Draco loader
      this.dracoLoader = new DRACOLoader()
      this.dracoLoader.setDecoderPath('draco/')

      // GLTF loader
      this.gltfLoader = new GLTFLoader()
      this.gltfLoader.setDRACOLoader(this.dracoLoader)

      /**
       * Textures
       */
      this.bakedTexture = this.textureLoader.load('/assets/baked-predemo3.jpg')
      this.bakedTexture.flipY = false

      this.bakedLogo = this.textureLoader.load('/assets/bakedLogo.jpg')
      this.bakedLogo.flipY = false

      this.bakedTexture2 = this.textureLoader.load('/assets/testing-tech-1.jpg')
      this.bakedTexture2.flipY = false

      this.bakedTexture3 = this.textureLoader.load('/assets/second-plitka-baked.jpg')
      this.bakedTexture3.flipY = false

      /**
       * Materials
       */
      // Baked material
      this.bakedMaterial = new THREE.MeshBasicMaterial({ map: this.bakedTexture })
      this.bakedMaterial2 = new THREE.MeshBasicMaterial({ map: this.bakedTexture2 })
      this.bakedMaterial3 = new THREE.MeshBasicMaterial({ map: this.bakedTexture3 })

      /**
       * Model
       */
      this.models = {}

      this.gltfLoader.load('/assets/aiu-predemo2.glb', (gltf) => {
        gltf.scene.traverse((child) => {
          child.material = this.bakedMaterial
        })
        this.models.building = gltf.scene
        console.log(this.models.building)
        this.scene.add(this.models.building)
      })

      this.gltfLoader.load('/assets/aiuplitka.glb', (gltf) => {
        gltf.scene.traverse((child) => {
          child.material = this.bakedMaterial2
        })
        this.scene.add(gltf.scene)
      })
      
      this.gltfLoader.load('/assets/aiu-second-plitka-predemo.glb', (gltf) => {
        gltf.scene.traverse((child) => {
          child.material = this.bakedMaterial3
        })
        this.scene.add(gltf.scene)
      })

      /**
       * Sizes
       */
      this.sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
      }

      window.addEventListener('resize', () => {
        // Update sizes
        this.sizes.width = window.innerWidth
        this.sizes.height = window.innerHeight

        // Update camera
        this.camera.aspect = this.sizes.width / this.sizes.height
        this.camera.updateProjectionMatrix()

        // Update renderer
        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      })

      /**
       * Camera
       */
      // Base camera
      this.camera = new THREE.PerspectiveCamera(
        45,
        this.sizes.width / this.sizes.height,
        0.1,
        100
      )
      this.camera.position.x = 10.54
      this.camera.position.y = 5.2
      this.camera.position.z = 8.85

      this.scene.add(this.camera)

      // Controls
      this.controls = new OrbitControls(this.camera, this.canvas)
      this.controls.enableDamping = true
      this.controls.enableZoom = false

      /**
       * Renderer
       */
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
      })
      this.renderer.setSize(this.sizes.width, this.sizes.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      this.renderer.setClearColor('#544ABC')

      /**
       * Animate
       */
      this.clock = new THREE.Clock()

      this.tick = () => {
        this.elapsedTime = this.clock.getElapsedTime()

        // Update controls
        this.controls.update()

        // Render
        this.renderer.render(this.scene, this.camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(this.tick)
      }

      this.tick()
    }
  }
}
</script>

<style scoped>

.webgl {
	position: absolute;
	top: 0;
	left: 0;
	outline: none;
}
</style>
