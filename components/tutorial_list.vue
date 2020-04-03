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
            <template v-if="Object.keys(tutorials).length">
                <li v-for="(data, id) in tutorials">
                    <p>
                        <nuxt-link :to="{
                            name: 'libraries-library-tutorials-tutorial',
                            params: { library: library, tutorial: id }
                        }"
                        >
                            {{ data.name }}
                        </nuxt-link>
                    </p>
                    <p>
                        By
                        <a v-if="data.author.homepage" :href="data.author.homepage">
                            {{ data.author.name }}
                        </a>
                        <template v-else>
                            {{ data.author.name }}
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
    </div>
</template>

<script>
    import utm from '../util/utm';

    export default {
        name: 'TutorialList',
        props: {
            library: {
                type: String,
                required: true,
            },
            tutorials: {
                type: Object,
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
