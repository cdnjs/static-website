<template>
    <section>
        <header>
            <Breadcrumbs></Breadcrumbs>
            <div class="content" v-if="state !== 2">
                <h1>{{ message }}</h1>
            </div>
            <div class="content" v-else>
                <h1>{{ library.name }}</h1>
                <div class="row">
                    <p v-if="library.algolia.github && library.algolia.github.stargazers_count" class="stars">
                        <i class="fas fa-star"></i>
                        {{ formatUnits(library.algolia.github.stargazers_count, 0) }}
                    </p>
                    <p v-if="library.algolia.github && library.algolia.github.user && library.algolia.github.repo"
                       class="repo"
                    >
                        <a :href="`https://github.com/${library.algolia.github.user}/${library.algolia.github.repo}?utm_source=cdnjs`">
                            <i class="fab fa-github"></i>
                            GitHub
                        </a>
                    </p>
                    <p v-if="library.autoupdate && library.autoupdate.source === 'npm'" class="auto-update">
                        <a :href="`https://npmjs.com/package/${library.autoupdate.target}?utm_source=cdnjs`">
                            <i class="fab fa-npm" aria-label="NPM"></i>
                            package
                        </a>
                    </p>
                </div>
            </div>
        </header>
        <div class="content">

        </div>
    </section>
</template>

<script>
    const semverSort = require('semver-sort');
    const formatUnits = require('../util/format_units');
    const getLibrary = require('../util/get_library');
    const Breadcrumbs = require('../components/breadcrumbs');

    module.exports = {
        name: 'Library',
        components: {
            Breadcrumbs,
        },
        data() {
            return {
                libraryName: null,
                library: null,
                state: 0,
                message: 'Loading...',
                version: null,
            }
        },
        methods: {
            formatUnits,
            versions() {
                return semverSort.desc(this.$data.library.assets.map(a => a.version));
            }
        },
        mounted() {
            this.$data.libraryName = this.$route.params.id;
            getLibrary(this.$data.libraryName).then(data => {
                console.log(data);
                this.$data.library = data;
                this.$data.version = data.version;
                console.log(this.versions());
                this.$data.state = 2;
            }).catch(e => {
                console.log(e);
                if (e.message === 'Library not found')
                    this.$data.message = `Could not find library ${this.$data.libraryName}`;
                else
                    this.$data.message = `Failed load library ${this.$data.libraryName}`;
                this.$data.state = 1;
            });
        }
    };
</script>
