<template>
    <nav class="nav">
        <div class="left">
            <nuxt-link :to="{ name: 'index' }" class="logo">
                <img src="../assets/img/logo.svg" alt="< cdnjs >" />
            </nuxt-link>
            <a href="https://twitter.com/cdnjs?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs_nav"
               aria-label="cdnjs on Twitter"
            >
                <i class="fab fa-twitter" aria-hidden="true"></i>
            </a>
            <a href="https://cdnjs.discourse.group/?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs_nav"
               aria-label="Community Discourse"
            >
                <i class="fab fa-discourse" aria-hidden="true"></i>
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
            <a href="https://github.com/cdnjs?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs_nav">
                GitHub
            </a>
            <a href="https://status.cdnjs.com?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs_nav">
                Status <StatusIndicator page-id="1fkb7yl9sw87"></StatusIndicator>
            </a>
        </div>
    </nav>
</template>

<script>
    import StatusIndicator from '../components/status_indicator';

    export default {
        name: 'Nav',
        components: {
            StatusIndicator,
        },
    };
</script>
