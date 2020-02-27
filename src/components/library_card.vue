<template>
    <li>
        <div class="title">
            <router-link :to="{ name: 'library', params: { id: library.name } }">
                {{ library.name }}
                <span class="version">@ {{ library.version }}</span>
            </router-link>

            <p v-if="library.github && library.github.stargazers_count" class="stars">
                <i class="fas fa-star"></i>
                {{ formatUnits(library.github.stargazers_count, 0) }}
            </p>

            <div class="links">
                <!-- TODO: VueTippy tooltip for each each -->
                <!-- TODO: Secondary (or replacement) tooltip on copy -->
                <i v-clipboard:copy="fileLink" class="fas fa-link"></i>
                <i v-if="fileCode" v-clipboard:copy="fileCode" class="fas fa-code"></i>
                <i v-if="library.sri" v-clipboard:copy="library.sri" class="fas fa-shield-alt"></i>
            </div>
        </div>

        <p class="description">
            {{ library.description }}
        </p>
        <p class="tags">
            Tags: <span class="keywords">{{ library.keywords.join(', ') }}</span>
        </p>
    </li>
</template>

<script>
    const formatUnits = require('../util/format_units');

    module.exports = {
        name: 'LibraryCard',
        props: {
            library: Object,
        },
        computed: {
            fileLink() {
                const lib = this.$props.library;
                return `https://cdnjs.cloudflare.com/ajax/libs/${lib.name}/${lib.version}/${lib.filename}`;
            },
            fileSRI() {
                if (!this.$props.library.sri) return '';
                return ` integrity="${this.$props.library.sri}" crossorigin="anonymous"`;
            },
            fileCode() {
                // TODO: move this logic to a util to resolve weird template issues
                const lib = this.$props.library;
                switch (lib.fileType) {
                case 'css':
                    // eslint-disable-next-line no-useless-escape
                    return `<link rel="stylesheet" href="${this.fileLink}"${this.fileSRI} \/>`;

                case 'js':
                    // eslint-disable-next-line no-useless-escape
                    return `<script src="${this.fileLink}"${this.fileSRI}><\/script>`;

                default:
                    return undefined;
                }
            },
        },
        methods: {
            formatUnits,
        },
    };
</script>
