<template>
    <div class="wrapper">
        <section class="landing">
            <AnimatedBackground></AnimatedBackground>

            <div class="content">
                <h1 v-if="error.customMsg">
                    {{ error.statusCode }}. {{ error.message }}
                </h1>
                <h1 v-else-if="error.statusCode === 404">
                    404. Sorry, the page you requested could not be found.
                </h1>
                <h1 v-else>
                    {{ error.statusCode }}. Sorry, an error occurred whilst loading this page.
                </h1>

                <div>
                    <nuxt-link :to="{ name: 'libraries' }" class="button">
                        Find a Library
                    </nuxt-link>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import AnimatedBackground from '../components/animated_background';
    import setMeta from '../util/set_meta';

    const meta = {
        title (data) {
            if (data.error.statusCode === 404) { return '404 Not found'; }
            return 'An error occurred';
        },
    };

    export default {
        name: 'NotFound',
        meta,
        head () {
            return setMeta(meta, this);
        },
        components: {
            AnimatedBackground,
        },
        props: {
            error: Object,
        },
        created () {
            console.error(this.$props.error);
        },
    };
</script>
