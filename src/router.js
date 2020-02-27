const VueRouter = require('vue-router').default;

const Index = require('./views/index.vue');
const Libraries = require('./views/libraries.vue');
const Library = require('./views/library.vue');
const NotFound = require('./views/not_found.vue');

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
        props: (route) => ({ query: route.query.q || '' }),
    },
    {
        name: 'library',
        meta: { classes: [] },
        path: '/libraries/:id',
        component: Library,
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
