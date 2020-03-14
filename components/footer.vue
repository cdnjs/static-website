<template>
    <footer>
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
                <a href="https://twitter.com/cdnjs" aria-label="cdnjs on Twitter">
                    <i class="fab fa-twitter" aria-hidden="true"></i>
                </a>
                <a href="https://github.com/cdnjs" aria-label="cdnjs on GitHub">
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

            <dd class="break"></dd>

            <dd>
                <a href="https://cdnjs.discourse.group?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs_footer">
                    Community Discourse
                </a>
            </dd>
            <dd>
                <a href="https://opencollective.com/cdnjs?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs_footer">
                    OpenCollective
                </a>
            </dd>
            <dd>
                <a href="https://www.patreon.com/cdnjs?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs_footer">
                    Patreon
                </a>
            </dd>
            <dd>
                <a href="https://www.cloudflare.com/network/?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs_footer">
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
                <a href="https://status.cdnjs.com">
                    Status Page
                </a>
            </dd>
            <dd>
                <a href="https://twitter.com/cdnjsStatus">
                    cdnjsStatus on Twitter
                </a>
            </dd>
            <dd>
                <a href="http://stats.pingdom.com/4jg86a2wqei0?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs_footer">
                    CDN Uptime
                </a>
            </dd>
        </dl>

        <dl>
            <dt>Sponsors</dt>
            <dd v-for="sponsor in sponsors">
                <a :href="`${sponsor.site}?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs_footer`">
                    {{ sponsor.name }}
                </a>
            </dd>
        </dl>
    </footer>
</template>

<script>
    import sponsors from '../util/sponsors';

    export default {
        name: 'Footer',
        data () {
            return {
                sponsors: sponsors.flat(1),
            };
        },
    };
</script>
