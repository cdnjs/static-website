<template>
    <div class="content tutorial-hero">
        <h1>{{ tutorial.name }}</h1>
        <h2>
            For
            <nuxt-link :to="{ name: 'libraries-library', params: { library: library.name } }">
                {{ library.name }}
            </nuxt-link>
        </h2>

        <p class="description">
            {{ tutorial.description }}
        </p>

        <div class="author row">
            <p>
                By
                <a v-if="tutorial.author.homepage" :href="tutorial.author.homepage">
                    {{ tutorial.author.name }}
                </a>
                <template v-else>{{ tutorial.author.name }}</template>
            </p>

            <p v-if="tutorial.author.twitter" class="twitter">
                <a :href="`https://twitter.com/${tutorial.author.twitter}?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs_tutorial`">
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

    export default {
        name: 'TutorialHero',
        props: {
            library: Object,
            tutorial: Object,
        },
        methods: {
            formatUnits,
        },
    };
</script>
