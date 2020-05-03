<template>
    <section class="sponsors">
        <div class="content">
            <h3>
                Sponsored by
            </h3>

            <div class="images">
                <img v-for="sponsor in sponsors" :src="require(`../assets/img/sponsors/${sponsor.image}`)" :alt="sponsor.name" />
            </div>
        </div>
    </section>
</template>

<script>
    import sponsors from '../data/sponsors';

    export default {
        name: 'Sponsors',
        data () {
            return {
                sponsors: sponsors.flat(1),
            };
        },
    };
</script>
