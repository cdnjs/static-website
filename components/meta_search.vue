<template>
    <Script type="application/ld+json">
        {
        "@context": "http://schema.org",
        "@type": "WebSite",
        "url": "{{ base() }}",
        "potentialAction": {
        "@type": "SearchAction",
        "target": "{{ base() }}libraries?&q={query}",
        "query": "required"
        }
        }
    </Script>
</template>

<script>
    import Script from './script';

    export default {
        name: 'MetaSearch',
        components: {
            Script,
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
