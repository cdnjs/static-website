<template>
    <nav ref="nav" class="nav">
        <div class="content">
            <div class="left">
                <nuxt-link :to="{ name: 'index' }" class="logo">
                    <img src="../assets/img/logo.svg" alt="< cdnjs >" />
                </nuxt-link>
                <a :href="utm('https://twitter.com/cdnjs', 'nav')"
                   aria-label="cdnjs on Twitter"
                >
                    <Twitter class="icon" aria-hidden="true"></Twitter>
                </a>
                <a :href="utm('https://github.com/cdnjs/cdnjs/discussions', 'nav')"
                   aria-label="Community Discussions"
                >
                    <Comments class="icon" aria-hidden="true"></Comments>
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
                <div class="fix-mobile">
                    <a class="icon-mobile" aria-label="Toggle menu" @click="toggleMenu">
                        <Bars class="icon" aria-hidden="true"></Bars>
                    </a>
                    <a class="status" :href="utm('https://status.cdnjs.com', 'nav')">
                        Status <StatusIndicator page-id="1fkb7yl9sw87"></StatusIndicator>
                    </a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    import Twitter from '@fortawesome/fontawesome-free/svgs/brands/twitter.svg?inline';
    import Comments from '@fortawesome/fontawesome-free/svgs/solid/comments.svg?inline';
    import Bars from '@fortawesome/fontawesome-free/svgs/solid/bars.svg?inline';
    import utm from '../util/utm';
    import StatusIndicator from '../components/status_indicator';

    export default {
        name: 'Nav',
        components: {
            Twitter,
            Comments,
            Bars,
            StatusIndicator,
        },
        methods: {
            utm,
            toggleMenu () {
                this.$refs.nav.classList.toggle('responsive');
            },
        },
    };
</script>
