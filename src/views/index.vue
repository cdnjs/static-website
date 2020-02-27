<template>
    <section>
        <h1>
            Simple. Fast. Reliable.
            <br/>Content delivery at its finest.
        </h1>

        <h2>
            cdnjs is a web CDN service, trusted by over 4,000,000 websites, working to make it faster and easier to
            load library files to your websites.
        </h2>

        <!-- Fake search that instantly redirects to libraries search page -->
        <ais-instant-search
            index-name="libraries"
            :search-client="searchClient"
            :search-function="searchFunction"
        >
            <ais-search-box :placeholder="placeholder"></ais-search-box>
        </ais-instant-search>
    </section>
</template>

<script>
    const algoliasearch = require('algoliasearch/lite');

    module.exports = {
        name: 'Index',
        data() {
            return {
                router: null,
                placeholder: 'Search libraries on cdnjs...',
                searchClient: algoliasearch(
                    '2QWLVLXZB6',
                    '2663c73014d2e4d6d1778cc8ad9fd010'
                ),
            };
        },
        methods: {
            searchFunction(helper) {
                if (helper.state.query) {
                    return this.$router.push({ path: '/libraries', query: { q: helper.state.query } });
                }
                helper.search();
            },
        },
        created() {
            this.$data.searchClient.initIndex('libraries').search('', { hitsPerPage: 0 })
                .then(data => this.$data.placeholder = `Search from ${data.nbHits.toLocaleString()} libraries on cdnjs...`);
        },
    };
</script>
