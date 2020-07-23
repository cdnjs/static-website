<template>
    <section>
        <TransitionHeight>
            <div v-if="!searchActive">
                <h1>
                    Simple. Fast. Reliable.
                    <br />Content delivery at its finest.
                </h1>

                <h2>
                    cdnjs is a free and open-source web CDN service trusted by over 10% of websites.
                    We make it faster and easier to load library files on your websites.
                </h2>
            </div>
        </TransitionHeight>

        <div class="homepage-search" :style="{ marginBottom: searchActive ? 0 : null }">
            <InlineSearch :margin="true" :results="5" @active="active" @inactive="inactive"></InlineSearch>
        </div>

        <Corner></Corner>
    </section>
</template>

<script>
    import Corner from '../components/corner';
    import InlineSearch from '../components/inline_search';
    import TransitionHeight from '../components/transition_height';
    import setMeta from '../util/set_meta';

    const meta = {
        title: '',
        breadcrumb: '',
        classes: ['landing'],
    };

    export default {
        name: 'Index',
        meta,
        components: {
            Corner,
            InlineSearch,
            TransitionHeight,
        },
        data () {
            return {
                searchActive: false,
            };
        },
        methods: {
            active () {
                this.$data.searchActive = true;
            },
            inactive () {
                this.$data.searchActive = false;
            },
        },
        head () {
            return setMeta(meta, this);
        },
    };
</script>
