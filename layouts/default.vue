<template>
    <div id="__app">
        <main :class="classes">
            <Nav>
                <transition name="search" type="out-in">
                    <InlineSearch v-if="showSearch"></InlineSearch>
                </transition>
            </Nav>
            <nuxt ref="nuxt" />
            <Banner></Banner>
        </main>

        <Footer></Footer>

        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-139601399-3"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-139601399-3');
        </script>
    </div>
</template>

<script>
    import Nav from '../components/nav';
    import InlineSearch from '../components/inline_search';
    import Banner from '../components/banner';
    import Footer from '../components/footer';

    let lastRoute;

    export default {
        name: 'App',
        components: {
            Nav,
            InlineSearch,
            Banner,
            Footer,
        },
        data () {
            return {
                classes: [],
                showSearch: true,
            };
        },
        created () {
            // Client-side only, trim trailing slashes
            if (!process.server) {
                this.$nuxt.$router.afterEach(() => {
                    this.checkTrailingSlash();
                });
                this.checkTrailingSlash();
            }
        },
        mounted () {
            this.$refs.nuxt.$on('beforeLeave', () => {
                this.$data.showSearch = false;
            });
            this.$refs.nuxt.$on('afterLeave', () => {
                this.$data.classes = [];
            });
            this.$refs.nuxt.$on('beforeEnter', () => {
                this.setClasses();
                this.checkInlineSearch();
            });
            this.setClasses();
            this.checkInlineSearch();
        },
        methods: {
            checkTrailingSlash () {
                // Don't loop if trimming the slash doesn't work
                if (lastRoute === this.$nuxt.$route.path) { return; }
                lastRoute = this.$nuxt.$route.path;

                // If we end with a slash, remove it and preserve all other data
                if (this.$nuxt.$route.path.endsWith('/')) {
                    this.$router.replace({
                        path: this.$nuxt.$route.path.slice(0, -1),
                        hash: this.$nuxt.$route.hash,
                        query: this.$nuxt.$route.query,
                        params: this.$nuxt.$route.params,
                    });
                }
            },
            checkInlineSearch () {
                // Hide search on landing
                if (this.$nuxt.context.route.name === 'index') {
                    this.$data.showSearch = false;
                    return;
                }

                // Hide search on libraries
                if (this.$nuxt.context.route.name === 'libraries') {
                    this.$data.showSearch = false;
                    return;
                }

                // Otherwise, show it
                this.$data.showSearch = true;
            },
            setClasses () {
                // Handle the error page which isn't a route
                if (this.$nuxt.context._errored) {
                    this.$data.classes = ['error', 'landing'];
                    return;
                }

                // Use the route name as a class always
                const route = this.$nuxt.context.route;
                const newClasses = [];
                newClasses.push(route.name);

                // Get additional classes from meta (which might be an object, or an array of objects)
                if (Array.isArray(route.meta)) {
                    newClasses.push(...route.meta.reduce((prev, item) => {
                        prev.push(...(item.classes || []));
                        return prev;
                    }, []));
                } else {
                    newClasses.push(...(route.meta.classes || []));
                }

                // Store it!
                this.$data.classes = newClasses;
            },
        },
    };
</script>
