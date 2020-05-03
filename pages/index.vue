<template>
    <div class="wrapper">
        <section class="landing">
            <AnimatedBackground></AnimatedBackground>

            <div class="content">
                <h1>
                    Simple. Fast. Reliable.
                    <br />Content delivery at its finest.
                </h1>

                <h2>
                    cdnjs is a free and open-source web CDN service trusted by over 10% of websites.
                    We make it faster and easier to load library files on your websites.
                </h2>

                <div>
                    <nuxt-link :to="{ name: 'libraries' }" class="button">
                        Find a Library
                    </nuxt-link>
                    <nuxt-link :to="{ name: 'about' }" class="button is-outline">
                        Learn More
                    </nuxt-link>
                </div>

                <Corner></Corner>
            </div>
        </section>

        <Sponsors></Sponsors>
    </div>
</template>

<script>
    import AnimatedBackground from '../components/animated_background';
    import Corner from '../components/corner';
    import Sponsors from '../components/sponsors';
    import setMeta from '../util/set_meta';

    const meta = {
        title: '',
        breadcrumb: '',
    };

    export default {
        name: 'Index',
        meta,
        head () {
            return setMeta(meta, this);
        },
        components: {
            AnimatedBackground,
            Corner,
            Sponsors,
        },
    };
</script>
