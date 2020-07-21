<template>
    <Script type="application/ld+json" v-html="json"></Script>
</template>

<script>
    import Script from '../script';
    import Library from '../../data/json-ld/library';

    export default {
        name: 'JSONLDLibrary',
        components: {
            Script,
        },
        props: {
            library: Object,
            libraryName: String,
        },
        computed: {
            json () {
                return JSON.stringify(Library(this.base, this.$props.library, this.$props.libraryName));
            },
            base () {
                const origin = process.env.SITE_HOST ||
                    (typeof (window) !== 'undefined' ? window.location.origin : '/');
                return origin + (origin.endsWith('/') ? '' : '/');
            },
        },
    };
</script>
