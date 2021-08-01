<script>
    import WebSite from '../../data/json-ld/website';

    export default {
        name: 'JSONLDWebSite',
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
                return WebSite(this.$baseUrl);
            },
        },
        render () {
            return '';
        },
    };
</script>
