<template>
    <div class="content library-hero">
        <h1>{{ library.name }}</h1>
        <div class="row">
            <p v-if="library.algolia && library.algolia.github && library.algolia.github.stargazers_count"
               class="stars"
            >
                <Star class="icon" aria-label="Stars"></Star>
                {{ formatUnits(library.algolia.github.stargazers_count, 0) }}
            </p>
            <p v-if="repo()" class="repo">
                <a :href="utm(`https://github.com/${repo()}`, 'library')">
                    <GitHub class="icon" aria-hidden="true"></GitHub>
                    GitHub
                </a>
            </p>
            <p v-if="library.autoupdate && library.autoupdate.source === 'npm'" class="auto-update">
                <a :href="utm(`https://npmjs.com/package/${library.autoupdate.target}`, 'library')">
                    <Npm class="icon" aria-label="NPM"></Npm>
                    package
                </a>
            </p>
            <p v-if="vulns">
                <a :href="vulns.url">
                    <ShieldAlt class="icon" aria-label="Snyk"></ShieldAlt>
                    {{ vulns.vulns }} vulnerabilities
                </a>
            </p>
        </div>
        <div class="row">
            <p v-if="library.licenses && library.licenses.length" class="license">
                <template v-for="(license, index) of library.licenses">
                    <a v-if="license.url" :href="utm(license.url, 'library')">
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
                <a :href="utm(library.homepage, 'library')">
                    {{ library.homepage }}
                </a>
            </p>
        </div>
        <p class="description">
            {{ library.description }}
        </p>
        <p v-if="library.keywords" class="tags">
            Tags: <span class="keywords">{{ library.keywords.join(', ') }}</span>
        </p>
    </div>
</template>

<script>
    import Star from '@fortawesome/fontawesome-free/svgs/solid/star.svg?inline';
    import GitHub from '@fortawesome/fontawesome-free/svgs/brands/github.svg?inline';
    import Npm from '@fortawesome/fontawesome-free/svgs/brands/npm.svg?inline';
    import ShieldAlt from '@fortawesome/fontawesome-free/svgs/solid/shield-alt.svg?inline';
    import formatUnits from '../util/format_units';
    import utm from '../util/utm';
    import getVulns from '../util/get_vulns';

    export default {
        name: 'LibraryHero',
        components: {
            Star,
            GitHub,
            Npm,
            ShieldAlt,
        },
        props: {
            library: Object,
            version: String,
        },
        data () {
            return {
                vulns: null,
            };
        },
        watch: {
            version: {
                immediate: true,
                async handler () {
                    this.$data.vulns = await getVulns(this.$props.library, this.$props.version).catch(() => {});
                },
            },
        },
        async created () {
            this.$data.vulns = await getVulns(this.$props.library, this.$props.version).catch(() => {});
        },
        methods: {
            formatUnits,
            utm,
            repo () {
                if (this.$props.library.algolia && this.$props.library.algolia.github &&
                    this.$props.library.algolia.github.user && this.$props.library.algolia.github.repo) {
                    return `${this.$props.library.algolia.github.user}/${this.$props.library.algolia.github.repo}`;
                }
            },
        },
    };
</script>
