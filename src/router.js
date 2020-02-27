const VueRouter = require('vue-router').default;

const Index = require('./views/index.vue');
const Libraries = require('./views/libraries.vue');
const NotFound = require('./views/not_found.vue');

const router = [
    {
        name: 'index',
        meta: { classes: ['landing'] },
        path: '/',
        component: Index
    },
    {
        name: 'libraries',
        meta: { classes: [] },
        path: '/libraries',
        component: Libraries, props: (route) => ({ query: route.query.q || '' })
    },
    {
        name: 'not-found',
        meta: { classes: ['landing'] },
        path: '*',
        component: NotFound
    },
];

module.exports = new VueRouter({
    mode: 'history',
    routes: router,
});
