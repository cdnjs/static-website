<template>
    <client-only>
        <ais-instant-search
            :search-client="searchClient"
            index-name="libraries"
            class="primary-search"
        >
            <ais-configure :query="searchQuery"></ais-configure>

            <header>
                <div class="content">
                    <!-- TODO: Make autofocus work -->
                    <ais-search-box :placeholder="placeholder" :autofocus="true"></ais-search-box>

                    <ais-stats>
                        <p slot-scope="{ nbHits, processingTimeMS }">
                            <span class="hits">{{ nbHits.toLocaleString() }}</span> libraries found in {{ processingTimeMS }}ms.
                        </p>
                    </ais-stats>
                </div>
            </header>

            <ais-state-results>
                <template slot-scope="{ query, nbHits, page, nbPages }">
                    <ais-infinite-hits class="content">
                        <ul slot-scope="{ items, refineNext }">
                            <template v-for="item in items">
                                <LibraryCard :key="item.objectID" :library="item"></LibraryCard>
                            </template>
                            <li v-if="page + 1 < nbPages" class="library-card show-more">
                                <button class="button" @click="refineNext">
                                    Show more results
                                </button>
                            </li>
                            <li class="library-card not-found">
                                <p v-if="nbHits">
                                    Couldn't find the library you're looking for?
                                </p>
                                <p v-else>
                                    We're sorry, the library you're searching for couldn't be found.
                                </p>
                                <p>
                                    You can make a request to have it added on our
                                    <a :href="utm('https://github.com/cdnjs/cdnjs', 'search')">GitHub repository</a>.
                                </p>
                                <p>
                                    Please make sure to <a :href="cdnjsSearch(query)">search and see if there is already an
                                        issue</a> for it before adding a request.
                                </p>
                            </li>
                        </ul>
                    </ais-infinite-hits>
                </template>
            </ais-state-results>
        </ais-instant-search>
    </client-only>
</template>

<script>
    import ClientOnly from 'vue-client-only';
    import AisInstantSearch from 'vue-instantsearch/src/components/InstantSearch';
    import AisConfigure from 'vue-instantsearch/src/components/Configure';
    import AisSearchBox from 'vue-instantsearch/src/components/SearchBox';
    import AisStats from 'vue-instantsearch/src/components/Stats';
    import AisStateResults from 'vue-instantsearch/src/components/StateResults';
    import AisInfiniteHits from 'vue-instantsearch/src/components/InfiniteHits';

    import searchClient from '../../util/search_client';
    import utm from '../../util/utm';
    import LibraryCard from '../library/library_card';

    export default {
        name: 'PrimarySearch',
        components: {
            ClientOnly,
            AisInstantSearch,
            AisConfigure,
            AisSearchBox,
            AisStats,
            AisStateResults,
            AisInfiniteHits,
            LibraryCard,
        },
        data () {
            return {
                searchQuery: this.$route.query.q || this.$route.query.query || '',
                placeholder: 'Search libraries on cdnjs...',
                searchClient,
            };
        },
        created () {
            this.$data.searchClient.initIndex('libraries').search('', { hitsPerPage: 0 })
                .then((data) => { this.$data.placeholder = `Search from ${data.nbHits.toLocaleString()} libraries on cdnjs...`; });
        },
        methods: {
            utm,
            cdnjsSearch (query) {
                return utm(`https://github.com/cdnjs/cdnjs/issues?utf8=✓&q=${encodeURIComponent(query)}`, 'search');
            },
        },
    };
</script>
