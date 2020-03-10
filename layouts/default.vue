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
                classes: [],
            };
        },
        methods: {
            checkInlineSearch() {
                // Show before we do anything
                this.$refs.inlineSearch.$data.hidden = false;

                // Hide search on landing
                if (this.$nuxt.context.route.name === 'index') this.$refs.inlineSearch.$data.hidden = true;

                // Hide search on libraries
                if (this.$nuxt.context.route.name === 'libraries') this.$refs.inlineSearch.$data.hidden = true;
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
