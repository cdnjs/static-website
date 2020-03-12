<template>
    <section>
        <h1>
            Simple. Fast. Reliable.
            <br />Content delivery at its finest.
        </h1>

        <h2>
            cdnjs is a web CDN service, trusted by over 985,000,000
            websites<sup><nuxt-link :to="{ name: 'about' }">*</nuxt-link></sup>,
            working to make it faster and easier to load library files to your websites.
        </h2>

        <InlineSearch :margin="true"></InlineSearch>

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
        head () {
            return setMeta(meta, this.$nuxt.context);
        },
        components: {
            Corner,
            InlineSearch,
        },
    };
</script>
