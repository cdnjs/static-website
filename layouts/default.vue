<template>
    <main :class="[$route.name, ...($route.meta.classes || [])]">
        <Nav>
            <InlineSearch ref="inlineSearch"></InlineSearch>
        </Nav>
        <nuxt />
        <Footer></Footer>
    </main>
</template>

<script>
    import Nav from '../components/nav';
    import InlineSearch from '../components/inline_search';
    import Footer from '../components/footer';
    import setMeta from '../util/set_meta';

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
            setMeta() {
                let title = this.$route.meta.title || '';
                if (typeof title === 'function') title = title(this);

                let desc = this.$route.meta.desc || '';
                if (typeof desc === 'function') desc = desc(this);

                setMeta(title, desc);
            },
        },
        created() {
            this.$nuxt.$router.beforeEach((_, __, next) => {
                console.log('before');
                this.recoverInlineSearch();
                next();
            });
            this.$nuxt.$router.afterEach(() => {
                console.log('after');
                this.setMeta();
                this.checkInlineSearch();
            });
        },
        mounted() {
            console.log(this.$route);
            console.log(this.$nuxt);
            console.log(this);
            this.setMeta();
            this.checkInlineSearch();
        },
    };
</script>
