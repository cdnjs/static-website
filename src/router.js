const VueRouter = require('vue-router').default;

const Index = () => import('./views/index');
const Libraries = () => import('./views/libraries');
const Library = () => import('./views/library');
const About = () => import('./views/about');
const API = () => import('./views/api');
const NotFound = () => import('./views/not_found');

const routes = [
    {
        name: 'index',
        meta: { classes: ['landing'] },
        path: '/',
        component: Index,
    },
    {
        name: 'libraries',
        meta: {
            title: 'Libraries',
            breadcrumb: 'Libraries',
            classes: [],
        },
        path: '/libraries',
        component: Libraries,
    },
    {
        name: 'library',
        meta: {
            title(context) {
                return `${context.$route.params.id} - Libraries`;
            },
            breadcrumb(context) {
                return context.$route.params.id;
            },
            classes: [],
        },
        path: '/libraries/:id',
        component: Library,
    },
    {
        name: 'about',
        meta: {
            title: 'About',
            breadcrumb: 'About',
            classes: [],
        },
        path: '/about',
        component: About,
    },
    {
        name: 'api',
        meta: {
            title: 'API',
            breadcrumb: 'API',
            classes: [],
        },
        path: '/api',
        component: API,
    },
    {
        // TODO: this
        name: 'sponsor-us',
        meta: { classes: [] },
        path: '/sponsor-us',
    },
    {
        name: 'not-found',
        meta: { classes: ['landing'] },
        path: '*',
        component: NotFound,
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

module.exports = router;
