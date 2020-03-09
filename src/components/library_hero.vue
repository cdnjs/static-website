<template>
    <div class="content library-hero">
        <h1>{{ library.name }}</h1>
        <div class="row">
            <p v-if="library.algolia && library.algolia.github && library.algolia.github.stargazers_count"
               class="stars"
            >
                <i class="fas fa-star"></i>
                {{ formatUnits(library.algolia.github.stargazers_count, 0) }}
            </p>
            <p v-if="repo()" class="repo">
                <a :href="`https://github.com/${repo()}?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs_library`">
                    <i class="fab fa-github"></i>
                    GitHub
                </a>
            </p>
            <p v-if="library.autoupdate && library.autoupdate.source === 'npm'" class="auto-update">
                <a :href="`https://npmjs.com/package/${library.autoupdate.target}?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs_library`">
                    <i class="fab fa-npm" aria-label="NPM"></i>
                    package
                </a>
            </p>
        </div>
        <div class="row">
            <p v-if="library.licenses" class="license">
                <template v-for="(license, index) of library.licenses">
                    <a v-if="license.url" :href="`${license.url}?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs_library`">
                        {{ license.type }}
                    </a>
                    <template v-else>
                        {{ license.type }}
                    </template>
                    {{ index !== library.licenses.length - 1 ? ', ' : '' }}
                </template>
                licensed
            </p>
            <p v-if="library.homepage" class="homepage">
                <a :href="`${library.homepage}?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs_library`">
                    {{ library.homepage }}
                </a>
            </p>
        </div>
        <p class="description">
            {{ library.description }}
        </p>
        <p class="tags">
            Tags: <span class="keywords">{{ library.keywords.join(', ') }}</span>
        </p>
    </div>
</template>

<script>
    const formatUnits = require('../util/format_units');

    module.exports = {
        name: 'LibraryHero',
        props: {
            library: Object,
        },
        methods: {
            formatUnits,
            repo() {
                if (this.$props.library.algolia && this.$props.library.algolia.github &&
                    this.$props.library.algolia.github.user && this.$props.library.algolia.github.repo)
                    return `${this.$props.library.algolia.github.user}/${this.$props.library.algolia.github.repo}`;
            },
        },
    };
</script>
