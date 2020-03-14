<template>
    <span ref="dot"></span>
</template>

<script>
    import status from '../util/statuspage_status';

    export default {
        name: 'StatusIndicator',
        props: {
            pageId: String,
        },
        async mounted () {
            // Fetch initial status
            await this.updateStatus();

            // Refresh every five minutes
            setInterval(() => {
                this.updateStatus();
            }, 5 * 60 * 1000);
        },
        methods: {
            async updateStatus () {
                const data = await status(this.$props.pageId);
                this.$refs.dot.className = `status-indicator status-indicator-${data.status.indicator}`;
            },
        },
    };
</script>
