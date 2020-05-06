<template>
    <section>
        <h1>
            Simple. Fast. Reliable.
            <br />Content delivery at its finest.
        </h1>

        <h2>
            cdnjs is a free and open-source web CDN service trusted by over 10% of websites.
            We make it faster and easier to load library files on your websites.
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
            return setMeta(meta, this);
        },
        components: {
            Corner,
            InlineSearch,
        },
    };
</script>
