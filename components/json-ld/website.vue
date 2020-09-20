<script>
    import WebSite from '../../data/json-ld/website';

    export default {
        name: 'JSONLDWebSite',
        computed: {
            json () {
                return WebSite(this.$baseUrl);
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
