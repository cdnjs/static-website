<template>
    <main :class="[$route.name, ...($route.meta.classes || [])]">
        <Nav>
            <InlineSearch ref="inlineSearch"></InlineSearch>
        </Nav>
        <router-view></router-view>
        <Footer></Footer>
    </main>
</template>

<script>
    const Nav = require('./components/nav');
    const InlineSearch = require('./components/inline_search');
    const Footer = require('./components/footer');

    module.exports = {
        name: 'App',
        components: {
            Nav,
            InlineSearch,
            Footer,
        },
        data() {
            return {
                currentSearchElm: null,
            };
        },
        methods: {
            recoverInlineSearch() {
                // Reset query
                this.$refs.inlineSearch.$data.showHits = false;
                this.$refs.inlineSearch.$refs.search.$data.state.refine('');

                // Recover element back to nav
                if (this.$data.currentSearchElm) {
                    // Show the elm
                    this.$refs.inlineSearch.$data.hidden = false;

                    // Move it back to the nav
                    while (this.$data.currentSearchElm.childNodes.length > 0) {
                        this.$refs.inlineSearch.$el.appendChild(this.$data.currentSearchElm.childNodes[0]);
                    }

                    // Reset where it is
                    this.$data.currentSearchElm = null;
                }
            },
            checkInlineSearch() {
                // Show before we do anything
                this.$refs.inlineSearch.$data.hidden = false;

                this.$nextTick(() => {
                    // Move search to inside landing on index
                    const searchTarget = this.$el.querySelector('[data-search-target]');
                    if (searchTarget) {
                        searchTarget.className = [...searchTarget.classList, ...this.$refs.inlineSearch.$el.classList].join(' ');
                        while (this.$refs.inlineSearch.$el.childNodes.length > 0) {
                            searchTarget.appendChild(this.$refs.inlineSearch.$el.childNodes[0]);
                        }
                        this.$data.currentSearchElm = searchTarget;
                    }

                    // Hide search on libraries
                    this.$refs.inlineSearch.$data.hidden = this.$route.name === 'libraries';
                });
            },
        },
        created() {
            this.$router.beforeEach((_, __, next) => {
                this.recoverInlineSearch();
                next();
            });
            this.$router.afterEach(() => {
                this.checkInlineSearch();
            });
        },
        mounted() {
            this.checkInlineSearch();
        },
    };
</script>
