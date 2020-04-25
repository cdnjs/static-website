<template>
    <span ref="dot"
          @mouseenter="tooltipShow"
          @mouseleave="tooltipHide"
    ></span>
</template>

<script>
    import tlite from 'tlite';
    import status from '../util/statuspage_status';

    export default {
        name: 'StatusIndicator',
        props: {
            pageId: String,
        },
        data () {
            return {
                status: null,
            };
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
                this.$data.status = data.status;
                this.$refs.dot.className = `status-indicator status-indicator-${data.status.indicator}`;
            },
            tooltipShow (evt) {
                evt.target.setAttribute('data-tlite', this.$data.status.description);
                tlite.show(evt.target);
            },
            tooltipHide (evt) {
                tlite.hide(evt.target);
            },
        },
    };
</script>
