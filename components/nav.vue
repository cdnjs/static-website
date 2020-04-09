<template>
    <nav class="nav">
        <div class="content">
            <div class="left">
                <nuxt-link :to="{ name: 'index' }" class="logo">
                    <img src="../assets/img/logo.svg" alt="< cdnjs >" />
                </nuxt-link>
                <a :href="utm('https://twitter.com/cdnjs', 'nav')"
                   aria-label="cdnjs on Twitter"
                >
                    <font-awesome-icon :icon="faTwitter" aria-hidden="true" />
                </a>
                <a :href="utm('https://cdnjs.discourse.group/', 'nav')"
                   aria-label="Community Discourse"
                >
                    <font-awesome-icon :icon="faDiscourse" aria-hidden="true" />
                </a>
            </div>

            <div class="middle">
                <slot></slot>
            </div>

            <div class="right">
                <nuxt-link :to="{ name: 'about' }">
                    About
                </nuxt-link>
                <nuxt-link :to="{ name: 'libraries' }">
                    Libraries
                </nuxt-link>
                <nuxt-link :to="{ name: 'api' }">
                    API
                </nuxt-link>
                <a :href="utm('https://github.com/cdnjs', 'nav')">
                    GitHub
                </a>
                <a :href="utm('https://status.cdnjs.com', 'nav')">
                    Status <StatusIndicator page-id="1fkb7yl9sw87"></StatusIndicator>
                </a>
            </div>
        </div>
    </nav>
</template>

<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faTwitter, faDiscourse } from '@fortawesome/free-brands-svg-icons';
    import utm from '../util/utm';
    import StatusIndicator from '../components/status_indicator';

    export default {
        name: 'Nav',
        components: {
            FontAwesomeIcon,
            StatusIndicator,
        },
        data () {
            return {
                faTwitter,
                faDiscourse,
            };
        },
        methods: {
            utm,
        },
    };
</script>
