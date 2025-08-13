import { type RouteRecordRaw } from 'vue-router';

export const appRoutes: RouteRecordRaw[] = [
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
];
