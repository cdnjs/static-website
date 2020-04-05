<template>
    <Script type="application/ld+json">
        {
            "@context": "http://schema.org",
            "@type": "CreativeWorkSeries",
            "name": "{{ library }} Tutorials",
            "headline": "{{ library }} Tutorials",
            "description": "Tutorials for {{ library }} on cdnjs",
            "keywords": "{{ keywords() }}",
            "url": "{{ base() }}{{ library }}/tutorials",
            "inLanguage": "en",
            "accessMode": "textual",
            "accessModeSufficient": "textual",
            "isAccessibleForFree": true,
            "isPartOf": "{{ base() }}{{ library }}",
            "publisher": {
                "@type": "Organization",
                "name": "cdnjs",
                "url": "{{ base() }}"
            },
            "sourceOrganization": {
                "@type": "Organization",
                "name": "cdnjs",
                "url": "{{ base() }}"
            }
        }
    </Script>
</template>

<script>
    import Script from '../script';

    export default {
        name: 'JSONLDTutorials',
        components: {
            Script,
        },
        props: {
            library: String,
            tutorials: Object,
        },
        methods: {
            keywords () {
                const tags = [];
                for (const tutorial of Object.values(this.$props.tutorials)) { if (tutorial.keywords) { tags.push(...tutorial.keywords); } }
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
