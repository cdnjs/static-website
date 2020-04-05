<template>
    <Script v-html="json" type="application/ld+json"></Script>
</template>

<script>
    import Script from '../script';
    import Tutorial from '../../data/json-ld/tutorial';

    export default {
        name: 'JSONLDTutorial',
        components: {
            Script,
        },
        props: {
            library: String,
            tutorial: Object,
            tutorialName: String,
        },
        computed: {
            json () {
                return Tutorial(this.base, this.$props.tutorial, this.$props.tutorialName, this.$props.library);
            },
            base () {
                const origin = process.env.SITE_HOST ||
                    (typeof (window) !== 'undefined' ? window.location.origin : '/');
                return origin + (origin.endsWith('/') ? '' : '/');
            },
        },
    };
</script>
