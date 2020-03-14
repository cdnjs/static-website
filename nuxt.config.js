const fetch = require('node-fetch');

module.exports = {
    mode: 'universal',
    /*
    ** Headers of the page
    */
    head: {
        title: 'cdnjs',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },

            { name: 'mobile-web-app-capable', content: 'yes' },
            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            { name: 'theme-color', content: '#D9643A' },

            { hid: 'title', name: 'title', content: 'cdnjs' },
            { hid: 'description', name: 'description', content: 'cdnjs' },

            { name: 'twitter:card', content: 'large_summary_image' },
            { name: 'twitter:site', content: '@cdnjs' },
            { name: 'twitter:creator', content: '@MattIPv4' },
            { hid: 'twitter:title', name: 'twitter:title', content: 'cdnjs' },
            { hid: 'twitter:description', name: 'twitter:description', content: 'cdnjs' },
            { name: 'twitter:image', content: '/banner.png' },
            { name: 'twitter:url', content: 'https://cdnjs.dev' },

            { name: 'canonicalURL', content: 'https://cdnjs.dev' },

            { hid: 'og:title', prefix: 'og: http://ogp.me/ns#', property: 'og:title', content: 'cdnjs' },
            { prefix: 'og: http://ogp.me/ns#', property: 'og:type', content: 'website' },
            { prefix: 'og: http://ogp.me/ns#', property: 'og:locale', content: 'en_GB' },
            { prefix: 'og: http://ogp.me/ns#', property: 'og:site_name', content: 'cdnjs' },
            {
                hid: 'og:description',
                prefix: 'og: http://ogp.me/ns#',
                property: 'og:description',
                content: 'cdnjs'
            },
            { prefix: 'og: http://ogp.me/ns#', property: 'og:url', content: 'https://cdnjs.dev' },
            { prefix: 'og: http://ogp.me/ns#', property: 'og:image', content: '/banner.png' },
            { prefix: 'og: http://ogp.me/ns#', property: 'og:image:url', content: '/banner.png' },
        ],
        link: [
            { rel: 'icon', type: 'image/png', href: '/favicon.png' },
            { rel: 'shortcut-icon', type: 'image/png', href: '/favicon.png' },
            { rel: 'apple-touch-icon', type: 'image/png', href: '/favicon.png' },

            { rel: 'canonical', href: 'https://cdnjs.dev' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700&display=swap' },
            {
                rel: 'stylesheet',
                href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css',
                integrity: 'sha256-mmgLkCYLUQbXn0B1SRqzHar6dCnv9oZFPEC1g1cwlkk=',
                crossorigin: 'anonymous'
            },
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#d9643a' },
    /*
    ** Load in our styling for the entire app
    */
    css: [
        '~/assets/scss/style.scss',
    ],
    /*
    ** Load in plugins before the app starts
    */
    plugins: [
        '~/plugins/vue-clipboard2.js',
        '~/plugins/vue-instantsearch.js',
        '~/plugins/vue-tippy.js',
    ],
    /*
    ** Transpile instant search for SSR
    */
    build: {
        transpile: ['vue-instantsearch', 'instantsearch.js/es'],
    },
    /*
    ** Fetch dynamic routes for static generation
    */
    generate: {
        routes() {
            return fetch(`https://api.cdnjs.com/libraries`)
                .then(res => res.json().then(data => {
                    return data.results.map((lib) => {
                        return '/libraries/' + lib.name
                    })
                }))
        },
        concurrency: 250,
        interval: 50,
        fallback: true
    }
};