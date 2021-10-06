import { join } from 'path';
import Sentry from '@sentry/cli';
import whitelist from './util/build/whitelist';
import staticFiles from './util/build/static';
import images from './util/build/images';
import fonts from './util/build/fonts';
import sitemap from './util/build/sitemap';
import robots from './util/build/robots';

export default async () => {
    // We need to get the commit hash for Sentry versioning
    let version;
    try {
        // Let Sentry try to determine the version (doesn't work on Heroku, not a git repo there)
        version = await new Sentry().releases.proposeVersion();
    } catch (_) {
        version = process.env.SOURCE_VERSION; // Heroku sets this, otherwise version can just be undefined
    }

    // Get base URL
    const base = process.env.SITE_HOST.trim().replace(/\/*$/, '');

    // Now we can generate the config
    return {
        /*
        ** Headers of the page
        */
        head: {
            htmlAttrs: { lang: 'en' },
            title: 'cdnjs',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },

                { name: 'mobile-web-app-capable', content: 'yes' },
                { name: 'apple-mobile-web-app-capable', content: 'yes' },
                { name: 'theme-color', content: '#d9643a' },

                { hid: 'title', name: 'title', content: 'cdnjs' },
                { hid: 'description', name: 'description', content: 'cdnjs' },
                { hid: 'keywords', name: 'keywords', content: 'cdnjs' },

                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:site', content: '@cdnjs' },
                { name: 'twitter:creator', content: '@MattIPv4' },
                { hid: 'twitter:title', name: 'twitter:title', content: 'cdnjs' },
                { hid: 'twitter:description', name: 'twitter:description', content: 'cdnjs' },
                { name: 'twitter:image', content: `${base}/banner.png` },
                { name: 'twitter:image:alt', content: 'cdnjs banner image' },
                { hid: 'twitter:url', name: 'twitter:url', content: base },

                { hid: 'og:title', prefix: 'og: http://ogp.me/ns#', property: 'og:title', content: 'cdnjs' },
                { prefix: 'og: http://ogp.me/ns#', property: 'og:type', content: 'website' },
                { prefix: 'og: http://ogp.me/ns#', property: 'og:locale', content: 'en_GB' },
                { prefix: 'og: http://ogp.me/ns#', property: 'og:site_name', content: 'cdnjs' },
                {
                    hid: 'og:description',
                    prefix: 'og: http://ogp.me/ns#',
                    property: 'og:description',
                    content: 'cdnjs',
                },
                { hid: 'og:url', prefix: 'og: http://ogp.me/ns#', property: 'og:url', content: base },
                { prefix: 'og: http://ogp.me/ns#', property: 'og:image', content: `${base}/banner.png` },
                { prefix: 'og: http://ogp.me/ns#', property: 'og:image:url', content: `${base}/banner.png` },
            ],
            link: [
                { rel: 'icon', type: 'image/png', href: '/favicon.png' },
                { rel: 'shortcut-icon', type: 'image/png', href: '/favicon.png' },
                { rel: 'apple-touch-icon', type: 'image/png', href: '/favicon.png' },
                { hid: 'canonical', rel: 'canonical', href: base },
            ],
            script: [
                { src: 'https://api.radar.cloudflare.com/beacon.js', defer: true },
            ],
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
            '~/plugins/inject-base.js',
        ],
        /*
        ** Load in modules that we're using in the app
        */
        modules: [
            '@nuxtjs/svg',
            '@nuxtjs/sentry',
        ],
        /*
        ** Configure the router to not use trailing slashes and to handle our custom routing
        */
        router: {
            trailingSlash: false,
            extendRoutes (routes, resolve) {
                routes.push({
                    name: 'libraries-library-version',
                    path: '/libraries/:library/:version?',
                    component: resolve(__dirname, 'pages/libraries/_library/index.vue'),
                });
            },
        },
        /*
        ** Customise our build process to handle additions we've made
        */
        build: {
            // Instantsearch needs specific treatment
            transpile: [
                'vue-instantsearch',
                'instantsearch.js/es',
            ],
            // Compress HTML a bit more than default
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
            // Use _/, not .nuxt/
            publicPath: '/_/',
            // Change babel to improve browser support
            babel: {
                presets ({ isServer }, [, options]) {
                    // Change the browserslist used for the client
                    if (!isServer) {
                        options.targets = {
                            ...options.targets,
                            browsers: 'defaults, > 0.2%',
                        };
                    }

                    // Use core-js@3
                    options.corejs = {
                        ...options.corejs,
                        version: 3,
                    };
                },
            },
        },
        buildModules: [
            process.env.GA_ID
                ? ['@nuxtjs/google-analytics', { id: process.env.GA_ID }]
                : null,
        ].filter(x => !!x),
        /*
        ** Use hooks to apply any optimizations to the final generated bundle
        */
        hooks: {
            build: {
                async before (builder) {
                    await whitelist(builder);
                },
                async done (builder) {
                    await staticFiles(builder);
                    await images(builder);
                    await fonts(builder);
                    if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
                        await sitemap(join(builder.nuxt.options.buildDir, 'dist', 'static'));
                    }
                    await robots(builder);
                },
            },
        },
        /*
        ** Disable graceful 404 handling by serve-placeholder, which breaks libraries with exts in their names (animate.css)
        */
        render: {
            fallback: false,
        },
        /*
        ** Allow Sentry to log errors within Nuxt
        */
        sentry: {
            dsn: process.env.SENTRY_DSN,
            publishRelease: version && 'SENTRY_AUTH_TOKEN' in process.env,
            sourceMapStyle: 'hidden-source-map',
            config: {
                release: version,
            },
        },
        /*
        ** Ensure that our env is exposed within Nuxt
        */
        env: {
            API_BASE: process.env.API_BASE,
        },
    };
};
