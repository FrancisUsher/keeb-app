import Vue from 'vue';
import Router from 'vue-router';
import Home from './pages/home';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/imugi',
            name: 'imugi',
            component: () =>
                import(/* webpackChunkName: "keyboards" */ './pages/imugi'),
        },
        {
            path: '/slope',
            name: 'slope',
            component: () =>
                import(/* webpackChunkName: "keyboards" */ './pages/slope'),
        },
    ],
});
