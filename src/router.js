const VueRouter = require('vue-router').default;

const Index = () => import('./views/index');
const Libraries = () => import('./views/libraries');
const Library = () => import('./views/library');
const About = () => import('./views/about');
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
        meta: { classes: [] },
        path: '/libraries',
        component: Libraries,
    },
    {
        name: 'library',
        meta: { classes: [] },
        path: '/libraries/:id',
        component: Library,
    },
    {
        name: 'about',
        meta: { classes: [] },
        path: '/about',
        component: About,
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
