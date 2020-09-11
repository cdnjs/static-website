<script>
    import Library from '../../data/json-ld/library';

    export default {
        name: 'JSONLDLibrary',
        props: {
            library: Object,
            libraryName: String,
        },
        computed: {
            json () {
                return Library(this.$base, this.library, this.libraryName);
            },
        },
        head () {
            return {
                script: [
                    {
                        type: 'application/ld+json',
                        json: this.json,
                    },
                ],
            };
        },
        render () {
            return '';
        },
    };
</script>
