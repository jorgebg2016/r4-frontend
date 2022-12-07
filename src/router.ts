import { Component, DefineComponent } from 'vue';
import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { store } from './store';

interface RoutesType {
    path: string;
    alias?: string;
    name: string;
    props?: boolean;
    component: Component|DefineComponent;
    children?: RoutesType[];
    meta?: {
        requiresAuth: boolean;
    };
}

const routes: RoutesType[] = [
    {
        path: '/',
        name: 'Login',
        component: () => import('./views/Auth/LoginView.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('./views/Dashboard/DashboardView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/categories',
        name: 'ListCategories',
        component: () => import('./views/Categories/ListCategoriesView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/categories/:category_id',
        name: 'DetailCategory',
        component: () => import('./views/Categories/DetailCategoryView.vue'),
        props: true,
        meta: { requiresAuth: true }
    },
    {
        path: '/categories/create',
        name: 'CreateCategory',
        component: () => import('./views/Categories/CreateCategoryView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/categories/:category_id/update',
        name: 'UpdateCategory',
        component: () => import('./views/Categories/UpdateCategoryView.vue'),
        props: true,
        meta: { requiresAuth: true }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeResolve((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {

    if(to.meta.requiresAuth && !store.getters.isLoggedIn) return next({ name: 'Login' });

    if(!to.meta.requiresAuth && store.getters.isLoggedIn) return next({ name: 'Dashboard' });

    if(!to.meta.requiresAuth && !store.getters.isLoggedIn) return next();

    if(to.meta.requiresAuth && store.getters.isLoggedIn) return next();
});

export default router;
