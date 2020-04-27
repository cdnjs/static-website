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
                <a :href="utm(`https://twitter.com/${tutorial.author.twitter}`, 'tutorial')"
                   :aria-label="`${tutorial.author.twitter} on Twitter`"
                >
                    <Twitter class="icon" aria-hidden="true"></Twitter>
                </a>
            </p>

            <p v-if="tutorial.author.email" class="email">
                <a :href="`mailto:${tutorial.author.email}`"
                   :aria-label="`${tutorial.author.name} via Email`"
                >
                    <EnvelopeOpen class="icon" aria-hidden="true"></EnvelopeOpen>
                </a>
            </p>
        </div>
    </div>
</template>

<script>
    import EnvelopeOpen from '@fortawesome/fontawesome-free/svgs/regular/envelope-open.svg?inline';
    import Twitter from '@fortawesome/fontawesome-free/svgs/brands/twitter.svg?inline';
    import formatUnits from '../util/format_units';
    import utm from '../util/utm';

    export default {
        name: 'TutorialHero',
        components: {
            EnvelopeOpen,
            Twitter,
        },
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
