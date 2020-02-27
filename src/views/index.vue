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
            <ais-search-box></ais-search-box>
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
                searchClient: algoliasearch(
                    '2QWLVLXZB6',
                    '2663c73014d2e4d6d1778cc8ad9fd010'
                ),
            };
        },
        methods: {
            searchFunction(helper) {
                helper.search();
                if (helper.state.query) {
                    console.log(helper.state.query);
                    this.$router.push({ path: '/libraries', query: { q: helper.state.query } });
                }
            },
        },
    };
</script>
