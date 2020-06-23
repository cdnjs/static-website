<template>
    <section>
        <header>
            <Breadcrumbs :crumbs="crumbs"></Breadcrumbs>
            <div v-if="!ready" class="content library-hero">
                <h1>{{ message }}</h1>
            </div>
            <LibraryHero v-else :library="library"></LibraryHero>
        </header>
        <div v-if="!ready" class="content">
        </div>
        <div v-else class="content row has-columns">
            <div class="column-half">
                <div class="row filter">
                    <p>Version</p>
                    <VueSelect v-model="version" :options="versions" :clearable="false"></VueSelect>
                    <p>Asset Type</p>
                    <VueSelect v-model="category" :options="categories" :clearable="false"></VueSelect>
                </div>
                <transition name="assets" type="out-in">
                    <template v-if="!assetsMessage">
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
                                        <span v-if="!asset.whitelisted"
                                              @mouseenter.raw="tooltipShow"
                                              @mouseleave.raw="tooltipHide"
                                              data-tlite="This file type is not whitelisted on the CDN and will not be available."
                                        >
                                            <ExclamationTriangle
                                                class="icon"
                                                aria-label="This file type is not whitelisted on the CDN and will not be available."
                                            />
                                        </span>
                                    </template>
                                </LibraryAssetButtons>
                            </li>
                        </ul>
                    </template>
                    <p v-else class="assets-error">
                        {{ assetsMessage }}
                    </p>
                </transition>
            </div>
            <div class="column-half">
                <TutorialList :library="libraryName" :tutorials="library.tutorials"></TutorialList>
            </div>
        </div>
        <JSONLDLibrary :library="library" :library-name="libraryName"></JSONLDLibrary>
    </section>
</template>

<script>
    import ExclamationTriangle from '@fortawesome/fontawesome-free/svgs/solid/exclamation-triangle.svg?inline';
    import semverSort from 'semver-sort';
    import { VueSelect } from 'vue-select';
    import tlite from 'tlite';
    import 'tlite/tlite.css';

    import formatUnits from '../../../util/format_units';
    import getLibrary from '../../../util/get_library';
    import { getAssets } from '../../../util/get_asset';
    import setMeta from '../../../util/set_meta';
    import breadcrumbs from '../../../util/breadcrumbs';
    import Breadcrumbs from '../../../components/breadcrumbs';
    import LibraryHero from '../../../components/library_hero';
    import LibraryAssetButtons from '../../../components/library_asset_buttons';
    import TutorialList from '../../../components/tutorial_list';
    import JSONLDLibrary from '../../../components/json-ld/library';

    const meta = {
        title (data) {
            return `${data.libraryName} - Libraries`;
        },
        breadcrumb (data, url) {
            return url.endsWith(data.libraryName) ? data.libraryName : data.params.version;
        },
        desc (data) {
            return data.library.description.trim();
        },
        classes: ['library'],
    };

    const getAssetsData = async (data, limit = false) => {
        try {
            const { assets, hasHidden, categories } = await getAssets(data, limit);
            data.assets = assets;
            data.hasHidden = hasHidden;
            data.categories = categories;
            data.assetsMessage = '';
        } catch (_) {
            if (!limit) {
                data.assetsMessage = `Failed to load assets for ${data.libraryName}/${data.version}`;
            }
        }
    };

    export default {
        name: 'Library',
        meta,
        head () {
            return setMeta(meta, this);
        },
        components: {
            ExclamationTriangle,
            Breadcrumbs,
            LibraryHero,
            LibraryAssetButtons,
            TutorialList,
            JSONLDLibrary,
            VueSelect,
        },
        computed: {
            versions () {
                try {
                    return semverSort.desc(this.$data.library.versions);
                } catch (_) {
                    return this.$data.library.versions;
                }
            },
        },
        watch: {
            async version () {
                // Update the asset list
                this.$data.assetsMessage = `Loading assets for ${this.$data.libraryName}/${this.$data.version}...`;
                await getAssetsData(this.$data);

                // Update the URL without navigating
                const newRoute = this.$router.resolve({
                    name: 'libraries-library-version',
                    params: { ...this.$route.params, version: this.$data.version },
                    query: this.$route.query,
                });
                window.history.pushState({}, '', newRoute.href);

                // Update the crumbs
                this.$data.params = newRoute.route.params;
                this.$data.crumbs = await breadcrumbs(newRoute.route, this.$router, this.$data);
            },
        },
        async asyncData ({ params, route, app, error, payload }) {
            const data = {
                libraryName: params.library,
                library: null,
                ready: false,
                assetsMessage: 'Loading...',
                message: 'Loading...',
                version: null,
                category: 'All',
                categories: [],
                assets: [],
                hasHidden: false,
                showHidden: false,
                crumbs: [],
                params,
            };

            // Attempt to get data for the lib
            let lib;
            if (payload) {
                lib = payload;
            } else {
                try {
                    lib = await getLibrary(data.libraryName);
                } catch (e) {
                    // If we fail to find it, let the user know
                    if (e.message === 'Library not found') {
                        error({
                            statusCode: 404,
                            customMsg: true,
                            message: `Sorry, we could not find the library you requested, ${data.libraryName}.`,
                        });
                    } else {
                        error({
                            statusCode: 500,
                            customMsg: true,
                            message: `Sorry, an error occurred whilst loading the library ${data.libraryName}.`,
                        });
                    }
                    return;
                }
            }

            // Save the lib data
            if (lib) {
                data.library = lib;

                data.version = params.version && lib.versions.includes(params.version) ? params.version : lib.version;
                data.version = lib.versions.includes(data.version) ? data.version : lib.versions[0];

                // Try loading in the assets for the requested version server-side, fail if too large
                try {
                    await getAssetsData(data, true);
                } catch (_) {
                    console.info(`Could not load assets for ${data.library.name}/${data.version}...`);
                }

                data.ready = true;
            }

            // Breadcrumbs!
            data.crumbs = await breadcrumbs(route, app.router, data);

            return data;
        },
        async mounted () {
            if (!this.$data.assets || !this.$data.assets.length) {
                await getAssetsData(this.$data);
            }
        },
        methods: {
            formatUnits,
            hideAsset (asset) {
                if (asset.hidden && !this.$data.showHidden) {
                    return true;
                }
                if (this.$data.category !== 'All') {
                    return asset.category !== this.$data.category;
                }
                return false;
            },
            tooltipShow (evt) {
                tlite.show(evt.target);
            },
            tooltipHide (evt) {
                tlite.hide(evt.target);
            },
        },
    };
</script>
