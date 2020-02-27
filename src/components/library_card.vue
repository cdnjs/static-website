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
                <i class="fas fa-link" v-clipboard:copy="fileLink"></i>
                <i class="fas fa-code" v-if="fileCode" v-clipboard:copy="fileCode"></i>
                <i class="fas fa-shield-alt" v-if="library.sri" v-clipboard:copy="library.sri"></i>
            </div>
        </div>

        <p class="description">{{ library.description }}</p>
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
                const lib = this.$props.library;
                switch (lib.fileType) {
                    case 'css':
                        return `<link rel="stylesheet" href="${this.fileLink}"${this.fileSRI} \/>`;

                    case 'js':
                        return `<script src="${this.fileLink}"${this.fileSRI}><\/script>`;

                    default:
                        return undefined;
                }
            }
        },
        methods: {
            formatUnits,
        },
    };
</script>
