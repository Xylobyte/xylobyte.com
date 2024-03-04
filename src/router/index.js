import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue')
        },
        {
            path: '/projects',
            name: 'projects',
            component: () => import('../views/ProjectsView.vue'),
            children: [
                {
                    path: ':id',
                    name: 'project',
                    component: () => import('../components/sections/projects/ProjectDetailsDialog.vue')
                }
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('../views/PageNotFound.vue')
        }
    ]
})

export default router
