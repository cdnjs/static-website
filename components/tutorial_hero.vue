<template>
    <div class="content tutorial-hero">
        <h1>{{ tutorial.name }}</h1>
        <h2>
            For
            <nuxt-link :to="{ name: 'libraries-library', params: { library } }">
                {{ library }}
            </nuxt-link>
        </h2>

        <p class="description">
            {{ tutorial.description }}
        </p>

        <div class="author row">
            <p>
                By
                <a v-if="tutorial.author.homepage" :href="utm(tutorial.author.homepage, 'tutorial')">
                    {{ tutorial.author.name }}
                </a>
                <template v-else>
                    {{ tutorial.author.name }}
                </template>
            </p>

            <p v-if="tutorial.author.twitter" class="twitter">
                <a :href="utm(`https://twitter.com/${tutorial.author.twitter}`, 'tutorial')">
                    <i class="fab fa-twitter"></i>
                </a>
            </p>

            <p v-if="tutorial.author.email" class="email">
                <a :href="`mailto:${tutorial.author.email}`">
                    <i class="far fa-envelope-open"></i>
                </a>
            </p>
        </div>
    </div>
</template>

<script>
    import formatUnits from '../util/format_units';
    import utm from '../util/utm';

    export default {
        name: 'TutorialHero',
        props: {
            library: String,
            tutorial: Object,
        },
        methods: {
            formatUnits,
            utm,
        },
    };
</script>
