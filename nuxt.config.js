const routes = require('./util/build/routes');
let cachedRoutes;

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
            { name: 'theme-color', content: '#d9643a' },

            { hid: 'title', name: 'title', content: 'cdnjs' },
            { hid: 'description', name: 'description', content: 'cdnjs' },

            { name: 'twitter:card', content: 'large_summary_image' },
            { name: 'twitter:site', content: '@cdnjs' },
            { name: 'twitter:creator', content: '@MattIPv4' },
            { hid: 'twitter:title', name: 'twitter:title', content: 'cdnjs' },
            { hid: 'twitter:description', name: 'twitter:description', content: 'cdnjs' },
            { name: 'twitter:image', content: 'https://cdnjs.dev/banner.png' },
            { name: 'twitter:image:alt', content: 'cdnjs banner image' },
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
            { prefix: 'og: http://ogp.me/ns#', property: 'og:image', content: 'https://cdnjs.dev/banner.png' },
            { prefix: 'og: http://ogp.me/ns#', property: 'og:image:url', content: 'https://cdnjs.dev/banner.png' },
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
    ** Set a transition for pages to avoid classes switching too early etc.
    */
    pageTransition: {
        name: 'page',
        mode: 'out-in',
        beforeLeave (el) {
            this.$emit('beforeLeave', el);
        },
        afterLeave (el) {
            this.$emit('afterLeave', el);
        },
        beforeEnter (el) {
            this.$emit('beforeEnter', el);
        },
        afterEnter (el) {
            this.$emit('afterEnter', el);
        },
    },
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
        '~/plugins/vue-tippy.js',
    ],
    /*
    ** Load in modules that we're using in the app
    */
    modules: [
        '@nuxtjs/sitemap',
    ],
    /*
    ** Configure the sitemap and let it know about all the dynamic routes
    */
    sitemap: {
        gzip: true,
        hostname: process.env.SITE_HOST || undefined,
        async routes() {
            const urls = [
                {
                    url: '/',
                    priority: 1,
                },
                {
                    url: '/libraries',
                    priority: 0.9,
                },
                {
                    url: '/about',
                    priority: 0.8,
                },
                {
                    url: '/api',
                    priority: 0.8,
                },
                {
                    url: '/sponsor',
                    priority: 0.7,
                },
            ];

            if (!cachedRoutes) cachedRoutes = await routes();
            urls.push(...cachedRoutes);

            return urls;
        },
    },
    /*
    ** Configure the router to not use trailing slashes
    */
    router: {
        trailingSlash: false,
    },
    /*
    ** Transpile instant search for SSR
    */
    build: {
        transpile: ['vue-instantsearch'],
        html: {
            minify: {
                collapseBooleanAttributes: true, // Default
                decodeEntities: true, // Default
                minifyCSS: true, // Default
                minifyJS: true, // Default
                processConditionalComments: true, // Default
                removeEmptyAttributes: true, // Default
                removeRedundantAttributes: true, // Default
                trimCustomFragments: true, // Default
                useShortDoctype: true, // Default
                removeComments: true, // Custom
            },
        },
    },
    /*
    ** Fetch dynamic routes for static generation
    */
    generate: {
        routes() {
            if (process.env.NODE_ENV === 'production') {
                if (cachedRoutes) return cachedRoutes.map(item => item.url);
                return routes().then(data => {
                    cachedRoutes = data;
                    return data.map(item => item.url);
                });
            }
            return [];
        },
        concurrency: 200,
        interval: 100,
        fallback: true,
    }
};
