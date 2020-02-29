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
        // TODO: this
        name: 'library',
        meta: { classes: [] },
        path: '/libraries/:id',
        component: Library,
    },
    {
        // TODO: this
        name: 'about',
        meta: { classes: [] },
        path: '/about',
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
