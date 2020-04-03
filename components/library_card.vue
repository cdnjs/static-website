<template>
    <li class="library-card">
        <div class="title">
            <nuxt-link :to="{ name: 'libraries-library', params: { id: library.name } }">
                {{ library.name }}
                <span class="version">@ {{ library.version }}</span>
            </nuxt-link>

            <p v-if="library.github && library.github.stargazers_count" class="stars">
                <i class="fas fa-star"></i>
                {{ formatUnits(library.github.stargazers_count, 0) }}
            </p>

            <LibraryAssetButtons :asset="asset"></LibraryAssetButtons>
        </div>

        <p class="description">
            {{ truncate(library.description, small ? 100 : 200) }}
        </p>
        <p v-if="!small" class="tags">
            Tags: <span class="keywords">{{ library.keywords.slice(0, 8).join(', ') }}</span>
        </p>
    </li>
</template>

<script>
    import getAsset from '../util/get_asset';
    import formatUnits from '../util/format_units';
    import truncate from '../util/truncate';
    import LibraryAssetButtons from './library_asset_buttons';

    export default {
        name: 'LibraryCard',
        components: {
            LibraryAssetButtons,
        },
        props: {
            library: Object,
            small: Boolean,
        },
        computed: {
            asset () {
                return getAsset(
                    this.$props.library.name,
                    this.$props.library.version,
                    this.$props.library.filename,
                    this.$props.library.sri,
                );
            },
        },
        methods: {
            formatUnits,
            truncate,
        },
    };
</script>
