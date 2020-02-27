<template>
    <ais-instant-search
        index-name="libraries"
        :search-client="searchClient"
        class="primary-search"
    >
        <ais-configure :query="query"></ais-configure>

        <header>
            <section>
                <ais-search-box :placeholder="placeholder" :autofocus="true"></ais-search-box>

                <ais-stats>
                    <p slot-scope="{ nbHits, processingTimeMS }">
                        <span class="hits">{{ nbHits.toLocaleString() }}</span> libraries found in {{ processingTimeMS }}ms.
                    </p>
                </ais-stats>
            </section>
        </header>

        <ais-infinite-hits>
            <ul slot-scope="{ items, refineNext }">
                <template v-for="item in items">
                    <LibraryCard :key="item.objectID" :library="item"></LibraryCard>
                </template>
                <li class="show-more">
                    <button @click="refineNext">
                        Show more results
                    </button>
                </li>
            </ul>
        </ais-infinite-hits>
    </ais-instant-search>
</template>

<script>
    const LibraryCard = require('./library_card');
    const searchClient = require('../util/search_client');

    module.exports = {
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
        created() {
            this.$data.searchClient.initIndex('libraries').search('', { hitsPerPage: 0 })
                .then(data => this.$data.placeholder = `Search from ${data.nbHits.toLocaleString()} libraries on cdnjs...`);
        },
    };
</script>
