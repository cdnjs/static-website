<script>
    import Tutorial from '../../data/json-ld/tutorial';

    export default {
        name: 'JSONLDTutorial',
        props: {
            library: String,
            tutorial: Object,
            tutorialName: String,
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
                return Tutorial(
                    this.$baseUrl,
                    this.$props.tutorial,
                    this.$props.tutorialName,
                    this.$props.library,
                );
            },
        },
        render () {
            return '';
        },
    };
</script>
