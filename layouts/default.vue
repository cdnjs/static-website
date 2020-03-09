<template>
    <main :class="classes">
        <Nav>
            <InlineSearch ref="inlineSearch"></InlineSearch>
        </Nav>
        <nuxt />
        <Footer></Footer>

        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-139601399-3"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-139601399-3');
        </script>
    </main>
</template>

<script>
    import Nav from '../components/nav';
    import InlineSearch from '../components/inline_search';
    import Footer from '../components/footer';

    export default {
        name: 'App',
        components: {
            Nav,
            InlineSearch,
            Footer,
        },
        data() {
            return {
                currentSearchElm: null,
                classes: [],
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
            setClasses() {
                const route = this.$nuxt.context.route;
                const newClasses = [];

                // Use the route name as a class always
                newClasses.push(route.name);

                // Get additional classes from meta (which might be an object, or an array of objects)
                if (Array.isArray(route.meta)) {
                    newClasses.push(...route.meta.reduce((prev, item) => {
                        prev.push(...(item.classes || []));
                        return prev;
                    }, []));
                } else {
                    newClasses.push(...(route.meta.classes || []))
                }

                // Store it!
                this.$data.classes = newClasses;
            }
        },
        created() {
            this.$nuxt.$router.beforeEach((_, __, next) => {
                this.recoverInlineSearch();
                next();
            });
            this.$nuxt.$router.afterEach(() => {
                this.setClasses();
                this.checkInlineSearch();
            });
        },
        mounted() {
            this.setClasses();
            this.checkInlineSearch();
        },
    };
</script>
