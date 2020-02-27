require('babel-polyfill');
const Vue = require('vue').default;
const VueRouter = require('vue-router').default;
const Index = require('./views/index.vue');

const routes = [
    { path: '/', component: Index },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

new Vue({
    render: h => h(Index),
    router,
}).$mount('#app');
