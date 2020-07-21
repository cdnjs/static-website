<template>
    <Script type="application/ld+json" v-html="json"></Script>
</template>

<script>
    import Script from '../script';
    import WebSite from '../../data/json-ld/website';

    export default {
        name: 'JSONLDWebSite',
        components: {
            Script,
        },
        computed: {
            json () {
                return JSON.stringify(WebSite(this.base));
            },
            base () {
                const origin = process.env.SITE_HOST ||
                    (typeof (window) !== 'undefined' ? window.location.origin : '/');
                return origin + (origin.endsWith('/') ? '' : '/');
            },
        },
    };
</script>
