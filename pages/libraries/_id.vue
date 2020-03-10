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
            <div class="row filter">
                <p>Version</p>
                <VueSelect v-model="version" :options="versions()" :clearable="false"></VueSelect>
                <br />
                <p>Asset Type</p>
                <VueSelect v-model="category" :options="categories" :clearable="false"></VueSelect>
            </div>
            <a @click="showHidden = !showHidden" v-if="hasHidden" class="button">
                {{ showHidden ? 'All files are shown, click to hide non-essential files'
                    : 'Some files are hidden, click to show all files' }}
            </a>
            <ul class="assets">
                <li v-for="asset of assets"
                    :key="asset.url"
                    :class="`asset${library.filename === asset.file ? ' default-asset' : ''}`"
                    :style="{ display: hideAsset(asset) ? 'none' : undefined }"
                >
                    <span class="url">{{ asset.url }}</span>
                    <LibraryAssetButtons :asset="asset">
                        <template slot="before">
                            <i v-if="!isWhitelisted(asset.type)"
                               v-tippy
                               content="This file type is not whitelisted on the CDN and will not be available."
                               class="fas fa-exclamation-triangle"
                            ></i>
                        </template>
                    </LibraryAssetButtons>
                </li>
            </ul>
            <!-- TODO: Tutorials? -->
        </div>
    </section>
</template>

<script>
    const semverSort = require('semver-sort');
    const globToRegExp = require('glob-to-regexp');
    const { VueSelect } = require('vue-select');
    const firstBy = require('thenby');
    import formatUnits from '../../util/format_units';
    import getLibrary from '../../util/get_library';
    import getAsset from '../../util/get_asset';
    import setMeta from "../../util/set_meta";
    import { isWhitelisted, category } from '../../util/file_type';
    import Breadcrumbs from '../../components/breadcrumbs';
    import LibraryHero from '../../components/library_hero';
    import LibraryAssetButtons from '../../components/library_asset_buttons';

    export default {
        name: 'Library',
        meta: {
            title(context) {
                return `${context.route.params.id} - Libraries`
            },
            breadcrumb(context) {
                return context.route.params.id;
            },
            classes: [],
        },
        head() {
            return setMeta(this.$nuxt.context);
        },
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
                category: 'All',
                categories: [],
                assets: [],
                hasHidden: false,
                showHidden: false,
            };
        },
        methods: {
            formatUnits,
            isWhitelisted,
            versions() {
                const versions = this.$data.library.assets.map(a => a.version);
                try {
                    return semverSort.desc(versions);
                } catch (_) {
                    return versions;
                }
            },
            hideAsset(asset) {
                if (asset.hidden && !this.$data.showHidden) return true;
                if (this.$data.category !== 'All') return category(asset.type) !== this.$data.category;
                return false;
            },
            getAssets() {
                // Generate the categories
                const categories = new Set();
                categories.add('All');

                // Get the raw assets for this version
                const rawAssets = this.$data.library.assets.find(a => a.version === this.$data.version);

                // Convert them to asset objects and sort them
                const sortedAssets = rawAssets.files
                    .map(asset => getAsset(
                        this.$data.library.name,
                        this.$data.version,
                        asset,
                        rawAssets.sri && asset in rawAssets.sri ? rawAssets.sri[asset] : null,
                    ))
                    .sort(
                        firstBy(v1 => v1.file === this.$data.library.filename, -1)
                            .thenBy((v1, v2) => v1.file.split('/').length - v2.file.split('/').length)
                            .thenBy('file'),
                    );

                // Determine if we have any minified files
                const minFileRe = globToRegExp('*.min.*');
                const hasMinifiedFiles = sortedAssets.reduce((prev, asset) => prev || minFileRe.test(asset.file), false);

                // Use some glob regex to determine if each file should be hidden
                const criticalFilesGlob = '{' + '*.min.js,' + '*.min.css,' + this.$data.library.filename + '}';
                const commonFileGlob = '{' + '*.js.*,' + '*.css.*,' + this.$data.library.filename + '}';
                const criticalFileRegExp = globToRegExp(criticalFilesGlob, { extended: true });
                const commonFileRegExp = globToRegExp(commonFileGlob, { extended: true });
                let hasHiddenFiles = false;
                const hiddenAssets = sortedAssets.map(asset => {
                    // Only hide things if we have lots of files and the current file isn't the default
                    asset.hidden = false;
                    if (sortedAssets.length > 20 && this.$data.library.filename !== asset.file) {
                        asset.hidden = !(hasMinifiedFiles ? criticalFileRegExp : commonFileRegExp).test(asset.file);
                        hasHiddenFiles = hasHiddenFiles || asset.hidden;
                    }

                    // Generate the categories whilst we're here
                    const cat = category(asset.type);
                    categories.add(cat);

                    // Done!
                    return asset;
                });

                // Done!
                this.$data.assets = hiddenAssets;
                this.$data.hasHidden = hasHiddenFiles;
                this.$data.categories = [...categories];
            },
        },
        watch: {
            version() {
                this.getAssets();
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
