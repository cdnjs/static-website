<template>
    <Script type="application/ld+json" v-html="json"></Script>
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
            tutorials: Array,
        },
        computed: {
            json () {
                return JSON.stringify(Tutorials(this.base, this.$props.library, this.$props.tutorials, this.keywords));
            },
            keywords () {
                const tags = [];
                for (const tutorial of this.$props.tutorials) {
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
