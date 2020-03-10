<template>
    <section>
        <h1>
            404. Sorry, the page you requested could not be found.
        </h1>
    </section>
</template>

<script>
    import setMeta from '../util/set_meta';

    export default {
        name: 'NotFound',
        meta: {
            title: '404 - Not Found',
            breadcrumb: 'Not Found',
            classes: [],
        },
        head () {
            return setMeta(this.$nuxt.context);
        },
    };
</script>
