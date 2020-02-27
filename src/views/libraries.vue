<template>
    <section>
        <portal-target name="fake-search"></portal-target>

        <ais-instant-search
            index-name="libraries"
            :search-client="searchClient"
        >
            <ais-configure :query="query"></ais-configure>
            <ais-search-box :placeholder="placeholder" :autofocus="true"></ais-search-box>
            <ais-infinite-hits>
                <ul slot-scope="{ items, refinePrevious, refineNext }">
                    <li v-for="item in items" :key="item.objectID">
                        {{ item.name }}
                    </li>
                    <li>
                        <button @click="refineNext">
                            Show more results
                        </button>
                    </li>
                </ul>
            </ais-infinite-hits>
        </ais-instant-search>
    </section>
</template>

<script>
    const algoliasearch = require('algoliasearch/lite');

    module.exports = {
        name: 'Libraries',
        props: {
            query: String,
        },
        data() {
            return {
                placeholder: 'Search libraries on cdnjs...',
                searchClient: algoliasearch(
                    '2QWLVLXZB6',
                    '2663c73014d2e4d6d1778cc8ad9fd010'
                ),
            };
        },
        created() {
            this.$data.searchClient.initIndex('libraries').search('', { hitsPerPage: 0 })
                .then(data => this.$data.placeholder = `Search from ${data.nbHits.toLocaleString()} libraries on cdnjs...`);
        },
    };
</script>
