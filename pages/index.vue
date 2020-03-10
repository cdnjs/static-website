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

        <div data-search-target></div>

        <Corner></Corner>
    </section>
</template>

<script>
    import Corner from '../components/corner';
    import setMeta from "../util/set_meta";

    export default {
        name: 'Index',
        meta: {
            title: '',
            breadcrumb: '',
            classes: ['landing'],
        },
        head() {
            return setMeta(this.$nuxt.context);
        },
        components: {
            Corner,
        },
    };
</script>
