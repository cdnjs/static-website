<template>
    <section>
        <transition-group name="homepage-search" type="out-in">
            <template v-if="!searchActive">
                <h1 key="h1">
                    Simple. Fast. Reliable.
                    <br />Content delivery at its finest.
                </h1>

                <h2 key="h2">
                    cdnjs is a free and open-source web CDN service trusted by over 10% of websites.
                    We make it faster and easier to load library files on your websites.
                </h2>
            </template>
        </transition-group>

        <div class="homepage-search">
            <InlineSearch :margin="true" :results="5" @focused="focused" @blurred="blurred"></InlineSearch>
        </div>

        <Corner></Corner>
    </section>
</template>

<script>
    import Corner from '../components/corner';
    import InlineSearch from '../components/inline_search';
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
        },
        data () {
            return {
                searchActive: false,
            };
        },
        methods: {
            focused () {
                this.$data.searchActive = true;
            },
            blurred () {
                this.$data.searchActive = false;
            },
        },
        head () {
            return setMeta(meta, this);
        },
    };
</script>
