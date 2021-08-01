<template>
    <client-only>
        <ais-instant-search
            ref="instantSearch"
            :search-client="customSearchClient"
            index-name="libraries"
            class="inline-search"
        >
            <ais-configure :hits-per-page.camel="results"></ais-configure>
            <ais-search-box ref="search"
                            :placeholder="placeholder"
                            @focus="focused"
                            @blur="blurred"
                            @submit.native="showMore"
                            @input.native="input"
            ></ais-search-box>
            <ais-state-results ref="results">
                <div>
                    <transition name="search" type="out-in">
                        <ais-hits v-if="active">
                            <ul slot-scope="{ items }">
                                <template v-for="item in items">
                                    <LibraryCard :key="item.objectID" :library="item" :small="true"></LibraryCard>
                                </template>
                            </ul>
                        </ais-hits>
                        <div v-else></div>
                    </transition>
                </div>
            </ais-state-results>
        </ais-instant-search>
    </client-only>
</template>

<script>
    import ClientOnly from 'vue-client-only';
    import AisInstantSearch from 'vue-instantsearch/src/components/InstantSearch';
    import AisConfigure from 'vue-instantsearch/src/components/Configure';
    import AisSearchBox from 'vue-instantsearch/src/components/SearchBox';
    import AisStateResults from 'vue-instantsearch/src/components/StateResults';
    import AisHits from 'vue-instantsearch/src/components/Hits';

    import searchClient from '../../util/search_client';
    import getStats from '../../util/get_stats';
    import LibraryCard from '../library/library_card';

    export default {
        name: 'InlineSearch',
        components: {
            ClientOnly,
            AisInstantSearch,
            AisConfigure,
            AisSearchBox,
            AisStateResults,
            AisHits,
            LibraryCard,
        },
        props: {
            margin: Boolean,
            results: {
                default () {
                    return 3;
                },
                type: Number,
            },
            autofocus: {
                default () {
                    return false;
                },
                type: Boolean,
            },
        },
        data () {
            return {
                showHits: false,
                hasFocus: false,
                listenerRegistered: false,
                query: undefined,
                placeholder: 'Search libraries on cdnjs...',
                customSearchClient: {
                    search: this.doSearch,
                },
                autofocusDone: false,
                listenForFocus: false,
            };
        },
        computed: {
            active () {
                return this.$data.showHits && (this.$data.hasFocus || this.$data.query);
            },
        },
        watch: {
            active (value) {
                this.$emit(value ? 'active' : 'inactive');
            },
        },
        created () {
            getStats().then((data) => {
                this.$data.placeholder = `Search from ${data.libraries.toLocaleString()} libraries on cdnjs...`;
            });
        },
        updated () {
            if (this.$props.autofocus) {
                // Autofocus the search box once it gets rendered
                // I hate how incredibly hacky this feels, but it works
                if (!this.$data.autofocusDone &&
                    this.$refs.search &&
                    this.$refs.search.$children &&
                    this.$refs.search.$children[0] &&
                    this.$refs.search.$children[0].$refs &&
                    this.$refs.search.$children[0].$refs.input) {
                    // Focus the input
                    this.$data.autofocusDone = true;
                    this.$refs.search.$children[0].$refs.input.focus();

                    // Disable focus events for a tick
                    this.$nextTick(() => { this.$data.listenForFocus = true; });
                }
            }
        },
        methods: {
            focused () {
                // Don't act as focused if autofocus
                if (this.$props.autofocus && !this.$data.listenForFocus) {
                    return;
                }

                // Register a listener for results
                if (!this.$data.listenerRegistered) {
                    this.$refs.instantSearch.instantSearchInstance.on('render', () => {
                        this.$nextTick(() => {
                            // Set a margin so it doesn't overflow the page (if enabled)
                            if (this.$props.margin) {
                                const results = this.$refs.results.$el;
                                results.parentElement.style.marginBottom = this.active ? `${results.offsetHeight + 4}px` : null;
                            }
                        });
                    });
                    this.$data.listenerRegistered = true;
                }

                // Ensure we are showing hits now they're using the input
                this.$data.showHits = true;
                this.$data.hasFocus = true;
            },
            blurred () {
                // If no query, this will hide the default results
                // Use a delay so that if the user clicks on one, it will navigate correctly
                setTimeout(() => {
                    this.$nextTick(() => {
                        this.$nextTick(() => {
                            this.$data.hasFocus = false;
                        });
                    });
                }, 200);
            },
            input () {
                this.focused();
                this.getQuery();
            },
            showMore () {
                this.$router.push({
                    name: 'libraries',
                    query: {
                        q: this.$data.query,
                    },
                });
            },
            getQuery () {
                this.$data.query = (this.$refs.search ? this.$refs.search.$children[0].$refs.input.value : undefined) || undefined;
            },
            doSearch (requests) {
                // Only run the actual search if active
                if (this.active) {
                    return searchClient.search(requests);
                }

                // Return nothing if not active
                return Promise.resolve({
                    results: requests.map(() => ({
                        hits: [],
                        nbHits: 0,
                        nbPages: 0,
                        processingTimeMS: 0,
                    })),
                });
            },
        },
    };
</script>
