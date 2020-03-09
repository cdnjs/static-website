<template>
    <section>
        <h1>
            Simple. Fast. Reliable.
            <br />Content delivery at its finest.
        </h1>

        <h2>
            cdnjs is a web CDN service, trusted by over 985,000,000
            websites<sup><router-link :to="{ name: 'about' }">*</router-link></sup>,
            working to make it faster and easier to load library files to your websites.
        </h2>

        <div data-search-target></div>

        <Corner></Corner>
    </section>
</template>

<script>
    import Corner from '../components/corner';

    export default {
        name: 'Index',
        components: {
            Corner,
        },
    };
</script>
