import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			name: 'home',
			path: '/',
			component: () => import('@/views/HomeView.vue'),
		},
		{
			name: 'projects',
			path: '/projects/:project?',
			component: () => import('@/views/ProjectsView.vue'),
		},
		{
			name: 'mentions-legales',
			path: '/mentions-legales',
			component: () => import('@/views/LegalMentionsView.vue'),
		},
		{
			name: 'not-found',
			path: '/:pathMatch(.*)*',
			component: () => import('@/views/PageNotFoundView.vue'),
		},
	],
	scrollBehavior: (to, from) => {
		if (from.name !== to.name || (from.hash && !to.hash)) return { top: 0 };
	},
});

export default router;
