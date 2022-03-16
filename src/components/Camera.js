import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera {
	constructor() {
		this.experience = window.experience
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.canvas = this.experience.canvas

		this.setInstance()
		this.setControls()
	}

	setInstance() {
		this.instance = new THREE.PerspectiveCamera(
			45,
			this.sizes.width / this.sizes.height,
			0.1,
			100
		)
		this.instance.position.set(
			10.539442839025593,
			4.522561033661047,
			9.791248947914658
		)

		// Vector3 {x: 10.539442839025593, y: 4.522561033661047, z: 9.791248947914658}
		// -5.612912465680054, y: 3.9588830882048867, z: 27.04857852954646
		// Vector3 {x: 10.127534675249887, y: 4.278593077311787, z: 8.820400772534661}

		// this.instance.rotation.x = -0.3712110832851981
		// this.instance.rotation.y = 0.851059280322306
		// this.instance.rotation.z = 0.2847583181281746
		// 11.532236923751684, y: 4.296040947407177, z: 8.39380074472 position
		// _x: -0.3712110832851981, _y: 0.851059280322306, _z: 0.2847583181281746 rotation
		this.scene.add(this.instance)
	}

	setControls() {
		this.controls = new OrbitControls(this.instance, this.canvas)
		this.controls.enableDamping = true
		this.controls.enableZoom = false
	}

	resize() {
		this.instance.aspect = this.sizes.width / this.sizes.height
		this.instance.updateProjectionMatrix()
	}

	update() {
		this.controls.update()
	}
}
