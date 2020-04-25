<template>
    <div class="tutorial-list">
        <h3 v-if="!singlePage">
            Library Tutorials
        </h3>
        <p>
            Want to write your own awesome tutorials?
            <a :href="githubLink">
                Make and submit them today
            </a>
        </p>
        <ul>
            <template v-if="tutorials.length">
                <li v-for="tutorial in tutorials">
                    <p>
                        <nuxt-link :to="{
                            name: 'libraries-library-tutorials-tutorial',
                            params: { library: library, tutorial: tutorial.id }
                        }"
                        >
                            {{ tutorial.name }}
                        </nuxt-link>
                    </p>
                    <p>
                        By
                        <a v-if="tutorial.author.homepage" :href="tutorial.author.homepage">
                            {{ tutorial.author.name }}
                        </a>
                        <template v-else>
                            {{ tutorial.author.name }}
                        </template>
                    </p>
                </li>
            </template>
            <li v-else>
                <p>
                    No tutorials found, <a :href="githubLink">want to write one</a>?
                </p>
            </li>
        </ul>
        <JSONLDTutorials :library="library" :tutorials="tutorials"></JSONLDTutorials>
    </div>
</template>

<script>
    import utm from '../util/utm';
    import JSONLDTutorials from './json-ld/tutorials';

    export default {
        name: 'TutorialList',
        components: {
            JSONLDTutorials,
        },
        props: {
            library: {
                type: String,
                required: true,
            },
            tutorials: {
                type: Array,
                required: true,
            },
            singlePage: {
                type: Boolean,
                required: false,
                default: false,
            },
        },
        data () {
            return {
                githubLink: utm('https://github.com/cdnjs/tutorials', 'tutorials'),
            };
        },
    };
</script>
