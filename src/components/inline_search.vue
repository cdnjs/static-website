<template>
    <keep-alive>
        <ais-instant-search
            index-name="libraries"
            :search-client="searchClient"
            class="inline-search"
            v-if="!hidden"
        >
            <ais-configure :hits-per-page.camel="3"></ais-configure>
            <ais-search-box
                :placeholder="placeholder"
                @focus="showHits = true"
                @blur="showHits = false"
                @submit.native="showMore"
                ref="search"
            ></ais-search-box>
            <ais-state-results>
                <template slot-scope="{ query }">
                    <ais-hits v-if="query.length > 0 && showHits">
                        <ul slot-scope="{ items }">
                            <li v-for="item in items" :key="item.objectID">
                                {{ item.name }}
                            </li>
                        </ul>
                    </ais-hits>
                    <div v-else></div>
                </template>
            </ais-state-results>
        </ais-instant-search>
    </keep-alive>
</template>

<script>
    const algoliasearch = require('algoliasearch/lite');

    module.exports = {
        name: 'InlineSearch',
        data() {
            return {
                hidden: false,
                showHits: false,
                placeholder: 'Search libraries on cdnjs...',
                searchClient: algoliasearch(
                    '2QWLVLXZB6',
                    '2663c73014d2e4d6d1778cc8ad9fd010'
                ),
            };
        },
        methods: {
            showMore() {
                this.$router.push({ path: '/libraries', query: {
                    q: this.$refs.search.$children[0].$refs.input.value || undefined
                }});
            },
        },
        created() {
            this.$data.searchClient.initIndex('libraries').search('', { hitsPerPage: 0 })
                .then(data => this.$data.placeholder = `Search from ${data.nbHits.toLocaleString()} libraries on cdnjs...`);
        },
    };
</script>
