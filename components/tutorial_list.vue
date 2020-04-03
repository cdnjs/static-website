<template>
    <div class="tutorials-list">
        <h3>Library Tutorials</h3>
        <p>
            Want to write your own awesome tutorials?
            <a href="https://github.com/cdnjs/tutorials?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs_tutorials">
                Make and submit them today
            </a>
        </p>
        <ul>
            <li v-for="(data, id) in tutorials">
                <p>
                    <nuxt-link :to="{
                        name: 'libraries-library-tutorials-tutorial',
                        params: { library: library.name, tutorial: id }
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
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'TutorialList',
        props: {
            library: String,
            tutorials: Object,
        },
    };
</script>
