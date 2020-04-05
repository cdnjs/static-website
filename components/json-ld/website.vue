<template>
    <Script type="application/ld+json">
        {
            "@context": "http://schema.org",
            "@type": "WebSite",
            "name": "cdnjs",
            "alternateName": "CDNJS",
            "description": "The #1 free and open source CDN built to make life easier for developers",
            "logo": "{{ base() }}favicon.png",
            "thumbnailUrl": "{{ base() }}banner.png",
            "url": "{{ base() }}",
            "sameAs": ["https://github.com/cdnjs", "https://twitter.com/cdnjs", "https://linkedin.com/company/cdnjs"],
            "potentialAction": {
                "@type": "SearchAction",
                "target": "{{ base() }}libraries?&q={query}",
                "query": "required"
            }
        }
    </Script>
</template>

<script>
    import Script from '../script';

    export default {
        name: 'JSONLDWebSite',
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
