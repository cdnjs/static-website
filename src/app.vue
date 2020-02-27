<template>
    <main :class="[$route.name, ...($route.meta.classes || [])]">
        <Nav>
            <InlineSearch ref="inlineSearch"></InlineSearch>
        </Nav>
        <router-view></router-view>
    </main>
</template>

<script>
    const Nav = require('./components/nav.vue');
    const InlineSearch = require('./components/inline_search.vue');

    module.exports = {
        name: 'App',
        components: {
            Nav,
            InlineSearch,
        },
        methods: {
            checkInlineSearch() {
                if (this.$route.name === 'libraries')
                    this.$refs.inlineSearch.$data.hidden = true;
                else
                    this.$refs.inlineSearch.$data.hidden = false;


                // If home, move to landing
                // Else, ensure in nav
            }
        },
        watch: {
            $route() {
                this.checkInlineSearch();
            }
        },
        mounted() {
            this.checkInlineSearch();
        },
    };
</script>
