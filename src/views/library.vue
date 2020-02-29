<template>
    <section>
        <header>
            <Breadcrumbs></Breadcrumbs>
            <div v-if="!ready" class="content library-hero">
                <h1>{{ message }}</h1>
            </div>
            <LibraryHero v-else :library="library"></LibraryHero>
        </header>
        <div v-if="!ready" class="content">
        </div>
        <div v-else class="content">
            <div class="row version">
                <p>Version</p>
                <VueSelect v-model="version" :options="versions()" :clearable="false"></VueSelect>
            </div>
            <ul class="assets">
                <li v-for="asset of assets()"
                    :key="asset.url"
                    :class="`asset${library.filename === asset.file ? ' default-asset' : ''}`"
                >
                    <span class="url">{{ asset.url }}</span>
                    <LibraryAssetButtons :asset="asset"></LibraryAssetButtons>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
    const semverSort = require('semver-sort');
    const formatUnits = require('../util/format_units');
    const getLibrary = require('../util/get_library');
    const getAsset = require('../util/get_asset');
    const Breadcrumbs = require('../components/breadcrumbs');
    const LibraryHero = require('../components/library_hero');
    const LibraryAssetButtons = require('../components/library_asset_buttons');
    const { VueSelect } = require('vue-select');
    const firstBy = require('thenby');

    module.exports = {
        name: 'Library',
        components: {
            Breadcrumbs,
            LibraryHero,
            LibraryAssetButtons,
            VueSelect,
        },
        data() {
            return {
                libraryName: null,
                library: null,
                ready: false,
                message: 'Loading...',
                version: null,
            };
        },
        methods: {
            formatUnits,
            versions() {
                const versions = this.$data.library.assets.map(a => a.version);
                try {
                    return semverSort.desc(versions);
                } catch (_) {
                    return versions;
                }
            },
            assets() {
                const assets = this.$data.library.assets.find(a => a.version === this.$data.version);
                return assets.files
                    .map(asset => getAsset(
                        this.$data.library.name,
                        this.$data.version,
                        asset,
                        assets.sri && asset in assets.sri ? assets.sri[asset] : null,
                    ))
                    .sort(
                        firstBy(v1 => v1.file === this.$data.library.filename, -1)
                            .thenBy((v1, v2) => v1.file.split('/').length - v2.file.split('/').length)
                            .thenBy('file'),
                    );
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
                this.$data.ready = true;
            }).catch(e => {
                // If we fail to find it, let the user know
                if (e.message === 'Library not found')
                    this.$data.message = `Could not find library ${this.$data.libraryName}`;
                else
                    this.$data.message = `Failed load library ${this.$data.libraryName}`;
            });
        },
    };
</script>
