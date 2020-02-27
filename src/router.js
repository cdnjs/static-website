const VueRouter = require('vue-router').default;

const Index = require('./views/index');
const Libraries = require('./views/libraries');
const Library = require('./views/library');
const NotFound = require('./views/not_found');

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
