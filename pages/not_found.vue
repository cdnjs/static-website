<template>
    <section>
        <h1>
            404. Sorry, the page you requested could not be found.
        </h1>
    </section>
</template>

<script>
    import setMeta from '../util/set_meta';

    const meta = {
        title: '404 - Not Found',
        breadcrumb: 'Not Found',
        classes: [],
    };

    export default {
        name: 'NotFound',
        meta,
        head () {
            return setMeta(meta, this.$nuxt.context);
        },
    };
</script>
