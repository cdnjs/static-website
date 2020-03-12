<template>
    <section>
        <h1 v-if="error.customMsg">
            {{ error.statusCode }}. {{ error.message }}
        </h1>
        <h1 v-else-if="error.statusCode === 404">
            404. Sorry, the page you requested could not be found.
        </h1>
        <h1 v-else>
            {{ error.statusCode }}. Sorry, an error occurred whilst loading this page.
        </h1>
    </section>
</template>

<script>
    import setMeta from '../util/set_meta';

    const meta = {
        title (data) {
            if (data.error.statusCode === 404) { return '404 Not found'; }
            return 'An error occurred';
        },
    };

    export default {
        name: 'NotFound',
        meta,
        head () {
            return setMeta(meta, this);
        },
        props: {
            error: Object,
        },
        created () {
            console.log(this.$props.error);
        },
    };
</script>
