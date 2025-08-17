import App from './App.vue';
import '@/assets/styles/base.scss';
import { ViteSSG } from 'vite-ssg';
import { createWebHistory } from 'vue-router';
import { appRoutes } from '@/router';
import { XylobyteAPI } from '@/api/XylobyteAPI.ts';
import { MotionGlobalConfig } from 'motion-v';

export const createApp = ViteSSG(
	App,
	{
		history: createWebHistory(import.meta.env.BASE_URL),
		scrollBehavior: (to, from) => {
			if (!import.meta.env.SSR && (from.name !== to.name || (from.hash && !to.hash))) return { top: 0 };
			return undefined;
		},
		routes: appRoutes,
	},
	() => {
		MotionGlobalConfig.skipAnimations = import.meta.env.SSR;
		MotionGlobalConfig.instantAnimations = import.meta.env.SSR;
	},
);

export const includedRoutes = async () => {
	const newPaths = ['/', '/projects', '/mentions-legales'];
	const projects = await XylobyteAPI.getProjects();
	projects.forEach(project => newPaths.push(`/projects/${project.id}`));
	console.log('New', newPaths);
	return newPaths;
};
