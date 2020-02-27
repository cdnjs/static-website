<template>
    <main :class="[$route.name, ...($route.meta.classes || [])]">
        <Nav></Nav>
        <router-view></router-view>
    </main>
</template>

<script>
    const Nav = require('./components/nav.vue');

    module.exports = {
        name: 'App',
        components: {
            Nav,
        },
        created() {
            console.log(this.$route);
        },
    };
</script>
