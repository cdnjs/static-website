<template>
    <li class="library-card">
        <div class="title">
            <nuxt-link :to="{ name: 'libraries-library', params: { library: library.name } }">
                {{ library.name }}
                <span class="version">@ {{ library.version }}</span>
            </nuxt-link>

            <div class="library-options">
                <p v-if="library.github && library.github.stargazers_count" class="stars">
                    <Star class="icon" aria-label="Stars"></Star>
                    {{ formatUnits(library.github.stargazers_count, 0) }}
                </p>

                <LibraryAssetButtons :asset="asset"></LibraryAssetButtons>
            </div>
        </div>

        <p class="description">
            {{ truncate(library.description, small ? 100 : 200) }}
        </p>
        <p v-if="!small" class="tags">
            Tags: <span class="keywords">{{ (library.keywords || []).slice(0, 8).join(', ') }}</span>
        </p>
    </li>
</template>

<script>
    import Star from '@fortawesome/fontawesome-free/svgs/solid/star.svg?inline';
    import { getAsset } from '../../util/get_asset';
    import formatUnits from '../../util/format_units';
    import truncate from '../../util/truncate';
    import LibraryAssetButtons from './library_asset_buttons';

    export default {
        name: 'LibraryCard',
        components: {
            Star,
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
