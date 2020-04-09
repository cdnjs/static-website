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
                    <font-awesome-icon :icon="faTwitter" aria-hidden="true" />
                </a>
            </p>

            <p v-if="tutorial.author.email" class="email">
                <a :href="`mailto:${tutorial.author.email}`"
                   :aria-label="`${tutorial.author.name} via Email`"
                >
                    <font-awesome-icon :icon="faEnvelopeOpen" aria-hidden="true" />
                </a>
            </p>
        </div>
    </div>
</template>

<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons';
    import { faTwitter } from '@fortawesome/free-brands-svg-icons';
    import formatUnits from '../util/format_units';
    import utm from '../util/utm';

    export default {
        name: 'TutorialHero',
        components: {
            FontAwesomeIcon,
        },
        props: {
            library: String,
            tutorial: Object,
        },
        data () {
            return {
                faEnvelopeOpen,
                faTwitter,
            };
        },
        methods: {
            formatUnits,
            utm,
        },
    };
</script>
