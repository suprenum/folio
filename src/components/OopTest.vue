<template>
  <canvas class="webgl" ref="aiu"></canvas>
</template>

<script>
import * as THREE from 'three'
import Resources from './Resources.js'
import sources from './sources.js'
import Sizes from './Sizes.js'
import Time from './Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'

export default {
  name: 'OopTest',
  data() {
    return {}
  },
  mounted() {
		window.experience = this

    this.canvas = this.$refs.aiu

    this.sizes = new Sizes()
		this.time = new Time()
		this.scene = new THREE.Scene()
		this.resources = new Resources(sources)
		this.camera = new Camera()
		this.renderer = new Renderer()
		console.log('start')


    this.resources.on('ready', () => {
      // Resource
      this.buildingResource = this.resources.items.AiuBuildingModel
      this.buildingTexture = this.resources.items.bakedAiuBuilding
      this.buildingTexture.flipY = false

      this.aiuModel = this.buildingResource.scene
      this.buildingBakedMaterial = new THREE.MeshBasicMaterial({
        map: this.buildingTexture,
      })

      this.aiuModel.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = this.buildingBakedMaterial
        }
      })
      this.scene.add(this.aiuModel)

      this.plitkaResource = this.resources.items.AiuPlitka
      this.plitkaTexture = this.resources.items.frontPlitka
      this.plitkaTexture.flipY = false

      this.frontPlitkaModel = this.plitkaResource.scene
      this.plitkaBakedMaterial = new THREE.MeshBasicMaterial({
        map: this.plitkaTexture,
      })
      this.frontPlitkaModel.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = this.plitkaBakedMaterial
        }
      })
      this.scene.add(this.frontPlitkaModel)

      this.secondPlitkaResource = this.resources.items.AiuPlitkaSecond
      this.backPlitkaTexture = this.resources.items.backPlitka
      this.backPlitkaTexture.flipY = false

      this.backPlitkaModel = this.secondPlitkaResource.scene
      this.plitkaBakedMaterial = new THREE.MeshBasicMaterial({
        map: this.backPlitkaTexture,
      })
      this.backPlitkaModel.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = this.plitkaBakedMaterial
        }
      })
      this.scene.add(this.backPlitkaModel)

      this.aiuModel.position.y = -1
      this.frontPlitkaModel.position.y = -1
      this.backPlitkaModel.position.y = -1

      this.floor = {}
      this.floor.modelResource = this.resources.items.floorModel
      this.floor.texture = this.resources.items.bakedFloor
      this.floor.texture.flipY = false

      this.floor.model = this.floor.modelResource.scene
      this.floor.material = new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
          uAlphaMask: { value: this.floor.texture },
          uColor: { value: new THREE.Color('#100C33') }
        },
        vertexShader: `
          varying vec2 vUv;

          void main()
          {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            vUv = uv;
          }
        `,
        fragmentShader: `
          uniform sampler2D uAlphaMask;
          uniform vec3 uColor;

          varying vec2 vUv;

          void main()
          {
            float alpha = 1.0 - texture2D(uAlphaMask, vUv).r;
            gl_FragColor = vec4(uColor, alpha);
          }
        `
      })
      this.floor.model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = this.floor.material
        }
      })
      this.scene.add(this.floor.model)
      this.floor.model.position.y = -1
		})

		// Resize event
		this.sizes.on('resize', () => {
			this.resize()
		})

		// Time tick event
		this.time.on('tick', () => {
			this.update()
		})
  },
  methods: {
    resize() {
      this.camera.resize()
      this.renderer.resize()
    },
    update() {
      this.camera.update()
      this.renderer.update()
    }
  },
  unmounted() {
    
		this.sizes.off('resize')
		this.time.off('tick')

		// Traverse the whole scene
		this.scene.traverse((child) => {
			// Test if it's a mesh
			if (child instanceof THREE.Mesh) {
				child.geometry.dispose()

				// Loop through the material properties
				for (const key in child.material) {
					const value = child.material[key]

					// Test if there is a dispose function
					if (value && typeof value.dispose === 'function') {
						value.dispose()
					}
				}
			}
		})

		this.camera.controls.dispose()
		this.renderer.instance.dispose()
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
