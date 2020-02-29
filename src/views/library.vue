<template>
    <section>
        <header>
            <Breadcrumbs></Breadcrumbs>
            <div v-if="state !== 2" class="content library-hero">
                <h1>{{ message }}</h1>
            </div>
            <LibraryHero v-else :library="library"></LibraryHero>
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
    const LibraryHero = require('../components/library_hero');

    module.exports = {
        name: 'Library',
        components: {
            Breadcrumbs,
            LibraryHero,
        },
        data() {
            return {
                libraryName: null,
                library: null,
                state: 0,
                message: 'Loading...',
                version: null,
            };
        },
        methods: {
            formatUnits,
            versions() {
                return semverSort.desc(this.$data.library.assets.map(a => a.version));
            },
        },
        mounted() {
            // Store the name from the URL
            this.$data.libraryName = this.$route.params.id;

            // Attempt to get data for the lib
            getLibrary(this.$data.libraryName).then(data => {
                // Save the lib data
                this.$data.library = data;
                this.$data.version = data.version;
                this.$data.state = 2;
            }).catch(e => {
                // If we fail to find it, let the user know
                if (e.message === 'Library not found')
                    this.$data.message = `Could not find library ${this.$data.libraryName}`;
                else
                    this.$data.message = `Failed load library ${this.$data.libraryName}`;
                this.$data.state = 1;
            });
        },
    };
</script>
