import Main from '@/pages/Main'
import { createRouter, createWebHistory } from 'vue-router'
import ProjectDetail from '@/pages/ProjectDetail'
import Aiu from '@/pages/Aiu'
import Galaxy from '@/pages/Galaxy'

const routes = [
	{
		path: '/',
		component: Main,
	},
	{
		path: '/aiu-detail',
		component: ProjectDetail,
	},
	{
		path: '/aiu',
		component: Aiu,
	},
	{
		path: '/galaxy',
		component: Galaxy,
	},
]

const router = createRouter({
	routes,
	history: createWebHistory(process.env.BASE_URL),
})

router.beforeEach(() => {
	window.scrollTo(0, 0)
})

export default router
