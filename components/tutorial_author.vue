<template>
    <div class="tutorial-author">
        <div class="content row">
            <VueGravatar :email="tutorial.author.email" :alt="tutorial.author.name" :size="128"></VueGravatar>

            <div class="details">
                <p class="name">
                    By
                    <a v-if="tutorial.author.homepage" :href="utm(tutorial.author.homepage, 'tutorial')">
                        {{ tutorial.author.name }}
                    </a>
                    <template v-else>
                        {{ tutorial.author.name }}
                    </template>
                </p>

                <p v-if="tutorial.author.description">
                    {{ tutorial.author.description }}
                </p>

                <p v-if="tutorial.author.twitter || tutorial.author.email" class="social">
                    <a v-if="tutorial.author.twitter" :href="utm(`https://twitter.com/${tutorial.author.twitter}`, 'tutorial')"
                       :aria-label="`${tutorial.author.twitter} on Twitter`"
                    >
                        <Twitter class="icon" aria-hidden="true"></Twitter>
                    </a>
                    <a v-if="tutorial.author.email" :href="`mailto:${tutorial.author.email}`"
                       :aria-label="`${tutorial.author.name} via Email`"
                    >
                        <EnvelopeOpen class="icon" aria-hidden="true"></EnvelopeOpen>
                    </a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import EnvelopeOpen from '@fortawesome/fontawesome-free/svgs/regular/envelope-open.svg?inline';
    import Twitter from '@fortawesome/fontawesome-free/svgs/brands/twitter.svg?inline';
    import utm from '../util/utm';
    import VueGravatar from 'vue-gravatar';

    export default {
        name: 'TutorialAuthor',
        components: {
            VueGravatar,
            EnvelopeOpen,
            Twitter,
        },
        props: {
            library: String,
            tutorial: Object,
        },
        methods: {
            utm,
        },
    };
</script>
