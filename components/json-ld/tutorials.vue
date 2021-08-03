<script>
    import Tutorials from '../../data/json-ld/tutorials';

    export default {
        name: 'JSONLDTutorials',
        props: {
            library: String,
            tutorials: Array,
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
        computed: {
            json () {
                return Tutorials(this.$baseUrl, this.$props.library, this.$props.tutorials, this.keywords);
            },
            keywords () {
                const tags = [];
                for (const tutorial of this.$props.tutorials) {
                    if (tutorial.keywords) {
                        tags.push(...tutorial.keywords);
                    }
                }
                return tags.join(',');
            },
        },
        render () {
            return '';
        },
    };
</script>
