<template>
    <ais-instant-search
        :search-client="searchClient"
        index-name="libraries"
        class="primary-search"
    >
        <ais-configure :query="query"></ais-configure>

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
                            <button @click="refineNext" class="button">
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
                                <a href="https://github.com/cdnjs/cdnjs">GitHub repository</a>.
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
</template>

<script>
    import LibraryCard from './library_card';
    import searchClient from '../util/search_client';

    export default {
        name: 'PrimarySearch',
        components: {
            LibraryCard,
        },
        data() {
            return {
                query: this.$route.query.q || this.$route.query.query || '',
                placeholder: 'Search libraries on cdnjs...',
                searchClient,
            };
        },
        methods: {
            cdnjsSearch(query) {
                return `https://github.com/cdnjs/cdnjs/issues?utf8=✓&q=${encodeURIComponent(query)}`;
            },
        },
        created() {
            this.$data.searchClient.initIndex('libraries').search('', { hitsPerPage: 0 })
                .then(data => this.$data.placeholder = `Search from ${data.nbHits.toLocaleString()} libraries on cdnjs...`);
        },
    };
</script>
