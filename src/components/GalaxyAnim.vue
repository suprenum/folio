<template>
  <div>
    <canvas class="webgl"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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
       * Galaxy
       */
      const parameters = {}
      parameters.count = 200000
      parameters.size = 0.005
      parameters.radius = 5
      parameters.branches = 3
      parameters.spin = 1
      parameters.randomness = 0.5
      parameters.randomnessPower = 3
      parameters.insideColor = '#ff6030'
      parameters.outsideColor = '#1b3984'

      let geometry = null
      let material = null
      let points = null

      const generateGalaxy = () => {
        if (points !== null) {
          geometry.dispose()
          material.dispose()
          this.scene.remove(points)
        }

        /**
         * Geometry
         */
        geometry = new THREE.BufferGeometry()

        const positions = new Float32Array(parameters.count * 3)
        const colors = new Float32Array(parameters.count * 3)
        const scales = new Float32Array(parameters.count * 1)
        const randomness = new Float32Array(parameters.count * 3)

        const insideColor = new THREE.Color(parameters.insideColor)
        const outsideColor = new THREE.Color(parameters.outsideColor)

        for (let i = 0; i < parameters.count; i++) {
          const i3 = i * 3

          // Position
          const radius = Math.random() * parameters.radius

          const branchAngle =
          ((i % parameters.branches) / parameters.branches) * Math.PI * 2

          positions[i3] = Math.cos(branchAngle) * radius
          positions[i3 + 1] = 0
          positions[i3 + 2] = Math.sin(branchAngle) * radius

          // Randomness
          const randomX =
          Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          parameters.randomness *
          radius
          const randomY =
          Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          parameters.randomness *
          radius
          const randomZ =
          Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          parameters.randomness *
          radius

          randomness[i3 + 0] = randomX
          randomness[i3 + 1] = randomY
          randomness[i3 + 2] = randomZ

          // Color
          const mixedColor = insideColor.clone()
          mixedColor.lerp(outsideColor, radius / parameters.radius)

          colors[i3] = mixedColor.r
          colors[i3 + 1] = mixedColor.g
          colors[i3 + 2] = mixedColor.b

          // Scale
          scales[i] = Math.random()
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
        geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3))

        /**
         * Material
         */
        material = new THREE.ShaderMaterial({
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          vertexColors: true,
          vertexShader: `
            uniform float uSize;
            uniform float uTime;

            attribute float aScale;
            attribute vec3 aRandomness;

            varying vec3 vColor;

            void main() 
            {   
                /**
                 * Position
                 */
                vec4 modelPosition = modelMatrix * vec4(position, 1.0);

                // Spin
                float angle = atan(modelPosition.x, modelPosition.z);
                float distanceToCenter = length(modelPosition.xz);
                float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;
                angle += angleOffset;
                modelPosition.x = cos(angle) * distanceToCenter;
                modelPosition.z = sin(angle) * distanceToCenter;

                // Randomness
                modelPosition.xyz += aRandomness;

                vec4 viewPosition = viewMatrix * modelPosition;
                vec4 projectionPosition = projectionMatrix * viewPosition;
                gl_Position = projectionPosition;

                /**
                 * Size
                 */
                gl_PointSize = uSize * aScale;
                gl_PointSize *= (1.0 / - viewPosition.z);

                /**
                 * Color
                 */
                vColor = color;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;

            void main()
            {
                float strength = distance(gl_PointCoord, vec2(0.5));
                strength = 1.0 - strength;
                strength = pow(strength, 10.0);

                // Final color
                vec3 color = mix(vec3(0.0), vColor, strength);
                
                gl_FragColor = vec4(color, 1.0);
            }
          `,
          uniforms: {
          uSize: { value: 30 * Math.min(window.devicePixelRatio, 2) },
          uTime: { value: 0 },
          },
        })

        /**
         * Points
         */
        points = new THREE.Points(geometry, material)
        this.scene.add(points)
      }

      generateGalaxy()


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
        75,
        this.sizes.width / this.sizes.height,
        0.1,
        100
      )
      this.camera.position.x = 3
      this.camera.position.y = 3
      this.camera.position.z = 3

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
      this.renderer.setClearColor('#000000')

      /**
       * Animate
       */
      this.clock = new THREE.Clock()

      this.tick = () => {
        this.elapsedTime = this.clock.getElapsedTime()

        // Update material
        material.uniforms.uTime.value = this.elapsedTime

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