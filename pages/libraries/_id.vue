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
    import formatUnits from '../../util/format_units';
    import getLibrary from '../../util/get_library';
    import getAsset from '../../util/get_asset';
    import setMeta from '../../util/set_meta';
    import { isWhitelisted, category } from '../../util/file_type';
    import Breadcrumbs from '../../components/breadcrumbs';
    import LibraryHero from '../../components/library_hero';
    import LibraryAssetButtons from '../../components/library_asset_buttons';
    const semverSort = require('semver-sort');
    const globToRegExp = require('glob-to-regexp');
    const { VueSelect } = require('vue-select');
    const firstBy = require('thenby');

    const meta = {
        title (data) {
            return `${data.libraryName} - Libraries`;
        },
        breadcrumb (data) {
            return data.libraryName;
        },
        classes: [],
    };

    const getAssets = (data) => {
        // Generate the categories
        const categories = new Set();
        categories.add('All');

        // Get the raw assets for this version
        const rawAssets = data.library.assets.find(a => a.version === data.version);

        // Convert them to asset objects and sort them
        const sortedAssets = rawAssets.files
            .map(asset => getAsset(
                data.library.name,
                data.version,
                asset,
                rawAssets.sri && asset in rawAssets.sri ? rawAssets.sri[asset] : null,
            ))
            .sort(
                firstBy(v1 => v1.file === data.library.filename, -1)
                    .thenBy((v1, v2) => v1.file.split('/').length - v2.file.split('/').length)
                    .thenBy('file'),
            );

        // Determine if we have any minified files
        const minFileRe = globToRegExp('*.min.*');
        const hasMinifiedFiles = sortedAssets.reduce((prev, asset) => prev || minFileRe.test(asset.file), false);

        // Use some glob regex to determine if each file should be hidden
        const criticalFilesGlob = '{' + '*.min.js,' + '*.min.css,' + data.library.filename + '}';
        const commonFileGlob = '{' + '*.js.*,' + '*.css.*,' + data.library.filename + '}';
        const criticalFileRegExp = globToRegExp(criticalFilesGlob, { extended: true });
        const commonFileRegExp = globToRegExp(commonFileGlob, { extended: true });
        let hasHiddenFiles = false;
        const hiddenAssets = sortedAssets.map((asset) => {
            // Only hide things if we have lots of files and the current file isn't the default
            asset.hidden = false;
            if (sortedAssets.length > 20 && data.library.filename !== asset.file) {
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
        return {
            assets: hiddenAssets,
            hasHidden: hasHiddenFiles,
            categories: [...categories],
        }
    };

    export default {
        name: 'Library',
        meta,
        head () {
            return setMeta(meta, this);
        },
        components: {
            Breadcrumbs,
            LibraryHero,
            LibraryAssetButtons,
            VueSelect,
        },
        async asyncData ({ params }) {
            const data = {
                libraryName: params.id,
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

            // Attempt to get data for the lib
            const lib = await getLibrary(data.libraryName).catch((e) => {
                // If we fail to find it, let the user know
                if (e.message === 'Library not found') {
                    data.message = `Could not find library ${data.libraryName}`;
                } else {
                    data.message = `Failed load library ${data.libraryName}`;
                }
            });

            // Save the lib data
            if (lib) {
                data.library = lib;
                data.version = lib.version;

                const { assets, hasHidden, categories } = getAssets(data);
                data.assets = assets;
                data.hasHidden = hasHidden;
                data.categories = categories;

                data.ready = true;
            }

            return data;
        },
        watch: {
            version () {
                this.getAssets();
            },
        },
        methods: {
            formatUnits,
            isWhitelisted,
            versions () {
                const versions = this.$data.library.assets.map(a => a.version);
                try {
                    return semverSort.desc(versions);
                } catch (_) {
                    return versions;
                }
            },
            hideAsset (asset) {
                if (asset.hidden && !this.$data.showHidden) { return true; }
                if (this.$data.category !== 'All') { return category(asset.type) !== this.$data.category; }
                return false;
            },
            getAssets () {
                const { assets, hasHidden, categories } = getAssets(this.$data);
                this.$data.assets = assets;
                this.$data.hasHidden = hasHidden;
                this.$data.categories = categories;
            },
        },
    };
</script>
