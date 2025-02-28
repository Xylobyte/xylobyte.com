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
			name: 'mentions-legales',
			path: '/mentions-legales',
			component: () => import('@/views/LegalMentionsView.vue'),
		},
		{
			name: 'not-found',
			path: '/:pathMatch(.*)*',
			component: () => import('@/views/PageNotFound.vue'),
		},
	],
	scrollBehavior: (to, from) => {
		if (to.name !== from.name || !to.hash) return { top: 0 };
	},
});

export default router;
