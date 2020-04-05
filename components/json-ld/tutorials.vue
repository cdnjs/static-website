<template>
    <Script v-html="json" type="application/ld+json"></Script>
</template>

<script>
    import Script from '../script';
    import Tutorials from '../../data/json-ld/tutorials';

    export default {
        name: 'JSONLDTutorials',
        components: {
            Script,
        },
        props: {
            library: String,
            tutorials: Object,
        },
        computed: {
            json () {
                return Tutorials(this.base, this.$props.library, this.$props.tutorials, this.keywords);
            },
            keywords () {
                const tags = [];
                for (const tutorial of Object.values(this.$props.tutorials)) {
                    if (tutorial.keywords) {
                        tags.push(...tutorial.keywords);
                    }
                }
                return tags.join(',');
            },
            base () {
                const origin = process.env.SITE_HOST ||
                    (typeof (window) !== 'undefined' ? window.location.origin : '/');
                return origin + (origin.endsWith('/') ? '' : '/');
            },
        },
    };
</script>
