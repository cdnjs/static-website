<template>
    <footer>
        <div class="content">
            <dl>
                <dd class="logo">
                    <nuxt-link :to="{ name: 'index' }">
                        <img src="../assets/img/logo.svg" alt="< cdnjs >" />
                    </nuxt-link>
                </dd>
                <dd class="copy-social">
                    <span>
                        &copy; {{ (new Date()).getFullYear().toString() }} cdnjs.
                    </span>
                    <a :href="utm('https://twitter.com/cdnjs', 'footer')"
                       aria-label="cdnjs on Twitter"
                    >
                        <i class="fab fa-twitter" aria-hidden="true"></i>
                    </a>
                    <a :href="utm('https://github.com/cdnjs', 'footer')"
                       aria-label="cdnjs on GitHub"
                    >
                        <i class="fab fa-github" aria-hidden="true"></i>
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
                    <nuxt-link :to="{ name: 'sponsor' }">
                        Sponsor Us
                    </nuxt-link>
                </dd>
                <dd>
                    <a :href="utm('https://swag.cdnjs.com', 'footer')">
                        Swag Store
                    </a>
                </dd>

                <dd class="break"></dd>

                <dd>
                    <a :href="utm('https://cdnjs.discourse.group', 'footer')">
                        Community Discourse
                    </a>
                </dd>
                <dd>
                    <a :href="utm('https://opencollective.com/cdnjs', 'footer')">
                        OpenCollective
                    </a>
                </dd>
                <dd>
                    <a :href="utm('https://www.patreon.com/cdnjs', 'footer')">
                        Patreon
                    </a>
                </dd>
                <dd>
                    <a :href="utm('https://www.cloudflare.com/network/', 'footer')">
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
                    <a :href="utm('https://status.cdnjs.com', 'footer')">
                        Status Page
                    </a>
                </dd>
                <dd>
                    <a :href="utm('https://twitter.com/cdnjsStatus', 'footer')">
                        cdnjsStatus on Twitter
                    </a>
                </dd>
                <dd>
                    <a :href="utm('http://stats.pingdom.com/4jg86a2wqei0', 'footer')">
                        CDN Uptime
                    </a>
                </dd>
            </dl>

            <dl>
                <dt>Sponsors</dt>
                <dd v-for="sponsor in sponsors">
                    <a :href="utm(sponsor.site, 'footer')">
                        {{ sponsor.name }}
                    </a>
                </dd>
            </dl>
        </div>
    </footer>
</template>

<script>
    import utm from '../util/utm';
    import sponsors from '../data/sponsors';

    export default {
        name: 'Footer',
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
