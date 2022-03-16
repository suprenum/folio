import Experience from '../Experience.js'
import Environment from './Environment.js'
// import Particles from './Particles.js'
import Fox from './Fox.js'

export default class World {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources

		// this.particles = new Particles()
		// Wait for resources
		this.resources.on('ready', () => {
			// Setup
			console.log('downloaded')
			this.fox = new Fox()
			this.environment = new Environment()
		})
	}

	update() {
		// this.particles.update()
		// this.fox.update()
		// setTimeout(() => {
		// 	this.fox.update()
		// }, 5000)
	}
}
