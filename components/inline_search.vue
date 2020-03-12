<template>
    <client-only>
        <ais-instant-search
            ref="instantSearch"
            v-if="!hidden"
            :search-client="searchClient"
            index-name="libraries"
            class="inline-search"
        >
            <ais-configure :hits-per-page.camel="3"></ais-configure>
            <ais-search-box ref="search"
                            :placeholder="placeholder"
                            @focus="focused"
                            @blur="blurred"
                            @submit.native="showMore"
            ></ais-search-box>
            <ais-state-results ref="results">
                <template slot-scope="{ query }">
                    <ais-hits v-if="(hasFocus || query.length > 0) && showHits">
                        <ul slot-scope="{ items }">
                            <template v-for="item in items">
                                <LibraryCard :key="item.objectID" :library="item" :small="true"></LibraryCard>
                            </template>
                        </ul>
                    </ais-hits>
                    <div v-else></div>
                </template>
            </ais-state-results>
        </ais-instant-search>
    </client-only>
</template>

<script>
    import ClientOnly from 'vue-client-only';
    import {
        AisInstantSearch,
        AisConfigure,
        AisSearchBox,
        AisStateResults,
        AisHits,
    } from 'vue-instantsearch';

    import searchClient from '../util/search_client';
    import LibraryCard from './library_card';

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
        },
        data () {
            return {
                hidden: false,
                showHits: false,
                hasFocus: false,
                listenerRegistered: false,
                placeholder: 'Search libraries on cdnjs...',
                searchClient,
            };
        },
        created () {
            this.$data.searchClient.initIndex('libraries').search('', { hitsPerPage: 0 })
                .then((data) => { this.$data.placeholder = `Search from ${data.nbHits.toLocaleString()} libraries on cdnjs...`; });
        },
        methods: {
            focused () {
                // Register a listener for results
                if (!this.$data.listenerRegistered) {
                    this.$refs.instantSearch.instantSearchInstance.helper.on('result', () => {
                        this.$nextTick(() => {
                            // Set a margin so it doesn't overflow the page (if enabled)
                            if (this.$props.margin) {
                                const results = this.$refs.results.$el;
                                results.parentElement.style.marginBottom = `${results.offsetHeight + 4}px`;
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
            showMore () {
                this.$router.push({
                    name: 'libraries',
                    query: {
                        q: this.$refs.search.$children[0].$refs.input.value || undefined,
                    },
                });
            },
        },
    };
</script>
