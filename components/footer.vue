<template>
    <footer>
        <div class="content">
            <dl>
                <dt class="logo">
                    <nuxt-link :to="{ name: 'index' }">
                        <img src="../assets/img/logo.svg" alt="< cdnjs >" />
                    </nuxt-link>
                </dt>
                <dd class="copy-social">
                    <span>
                        &copy; {{ (new Date()).getFullYear().toString() }} cdnjs.
                    </span>
                    <a :href="utm('https://twitter.com/cdnjs', 'footer')"
                       aria-label="cdnjs on Twitter"
                       rel="noopener"
                    >
                        <Twitter class="icon" aria-hidden="true"></Twitter>
                    </a>
                    <a :href="utm('https://github.com/cdnjs', 'footer')"
                       aria-label="cdnjs on GitHub"
                       rel="noopener"
                    >
                        <GitHub class="icon" aria-hidden="true"></GitHub>
                    </a>
                </dd>
            </dl>

            <dl>
                <dt class="title">
                    About
                </dt>
                <dd>
                    <nuxt-link :to="{ name: 'about' }">
                        About Us
                    </nuxt-link>
                </dd>
                <dd>
                    <a :href="utm('https://swag.cdnjs.com', 'footer')" rel="noopener">
                        Swag Store
                    </a>
                </dd>

                <dd class="break"></dd>

                <dd>
                    <a :href="utm('https://github.com/cdnjs/cdnjs/discussions', 'footer')" rel="noopener">
                        Community Discussions
                    </a>
                </dd>
                <dd>
                    <a :href="utm('https://opencollective.com/cdnjs', 'footer')" rel="noopener">
                        OpenCollective
                    </a>
                </dd>
                <dd>
                    <a :href="utm('https://www.patreon.com/cdnjs', 'footer')" rel="noopener">
                        Patreon
                    </a>
                </dd>
                <dd>
                    <a :href="utm('https://www.cloudflare.com/network/', 'footer')" rel="noopener">
                        CDN Network Map
                    </a>
                </dd>
            </dl>

            <dl>
                <dt>Libraries</dt>
                <dd>
                    <nuxt-link :to="{ name: 'libraries' }">
                        Search Libraries
                    </nuxt-link>
                </dd>
                <dd>
                    <nuxt-link :to="{ name: 'api' }">
                        API Documentation
                    </nuxt-link>
                </dd>

                <dt>Status</dt>
                <dd>
                    <a :href="utm('https://status.cdnjs.com', 'footer')" rel="noopener">
                        Status Page
                    </a>
                </dd>
                <dd>
                    <a :href="utm('https://twitter.com/cdnjsStatus', 'footer')" rel="noopener">
                        cdnjsStatus on Twitter
                    </a>
                </dd>
            </dl>

            <dl>
                <dt>Sponsors</dt>
                <dd v-for="sponsor in sponsors">
                    <a :href="utm(sponsor.site, 'footer')" rel="sponsored noopener">
                        {{ sponsor.name }}
                    </a>
                </dd>
            </dl>
        </div>
    </footer>
</template>

<script>
    import Twitter from '@fortawesome/fontawesome-free/svgs/brands/twitter.svg?inline';
    import GitHub from '@fortawesome/fontawesome-free/svgs/brands/github.svg?inline';
    import utm from '../util/utm';
    import sponsors from '../data/sponsors';

    export default {
        name: 'Footer',
        components: {
            Twitter,
            GitHub,
        },
        data () {
            return {
                sponsors: sponsors.flat(1),
            };
        },
        methods: {
            utm,
        },
    };
</script>
