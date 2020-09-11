<script>
    import Tutorial from '../../data/json-ld/tutorial';

    export default {
        name: 'JSONLDTutorial',
        props: {
            library: String,
            tutorial: Object,
            tutorialName: String,
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
