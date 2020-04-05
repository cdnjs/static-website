<template>
    <Script type="application/ld+json">
        {
            "@context": "http://schema.org",
            "@type": "TechArticle",
            "name": "{{ tutorial.name }}",
            "headline": "{{ tutorial.name }}",
            "description": "{{ tutorial.description }}",
            "keywords": "{{ tutorial.keywords && tutorial.keywords.join(',') }}",
            "url": "{{ base() }}{{ library }}/tutorials/{{ tutorialName }}",
            "inLanguage": "en",
            "accessMode": "textual",
            "accessModeSufficient": "textual",
            "isAccessibleForFree": true,
            "isPartOf": "{{ base() }}{{ library }}/tutorials",
            "author": {
                "@type": "Person",
                "name": "{{ tutorial.author.name }}"
            },
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
        name: 'JSONLDTutorial',
        components: {
            Script,
        },
        props: {
            library: String,
            tutorial: Object,
            tutorialName: String,
        },
        methods: {
            base () {
                const origin = process.env.SITE_HOST ||
                    (typeof (window) !== 'undefined' ? window.location.origin : '/');
                return origin + (origin.endsWith('/') ? '' : '/');
            },
        },
    };
</script>
