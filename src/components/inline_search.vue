<template>
    <keep-alive>
        <ais-instant-search
            v-if="!hidden"
            ref="instantSearch"
            index-name="libraries"
            :search-client="searchClient"
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
                            <li v-for="item in items" :key="item.objectID">
                                <router-link :to="{ name: 'library', params: { id: item.name } }">
                                    <p class="name">
                                        {{ item.name }} <span class="version">@ {{ item.version }}</span>
                                    </p>
                                    <p class="description">
                                        {{ item.description }}
                                    </p>
                                </router-link>
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
    const searchClient = require('../util/search_client');

    module.exports = {
        name: 'InlineSearch',
        data() {
            return {
                hidden: false,
                showHits: false,
                hasFocus: false,
                listenerRegistered: false,
                placeholder: 'Search libraries on cdnjs...',
                searchClient,
            };
        },
        methods: {
            focused() {
                // Register a listener for results
                if (!this.$data.listenerRegistered) {
                    this.$refs.instantSearch.instantSearchInstance.helper.on('result', () => {
                        this.$nextTick(() => {
                            // If the search element is not in the nav, set a margin so it doesn't overflow the page
                            if (!this.$refs.instantSearch.$el.childNodes.length) {
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
            blurred() {
                this.$data.hasFocus = false;
            },
            showMore() {
                this.$router.push({ name: 'libraries', query: {
                    q: this.$refs.search.$children[0].$refs.input.value || undefined,
                }});
            },
        },
        created() {
            this.$data.searchClient.initIndex('libraries').search('', { hitsPerPage: 0 })
                .then(data => this.$data.placeholder = `Search from ${data.nbHits.toLocaleString()} libraries on cdnjs...`);
        },
    };
</script>
