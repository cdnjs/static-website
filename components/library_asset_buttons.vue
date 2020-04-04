<template>
    <div class="library-asset-buttons">
        <slot name="before"></slot>
        <i v-clipboard:copy="asset.url"
           v-clipboard:success="tooltipCopied"
           @mouseenter="tooltipShow"
           @mouseleave="tooltipHide"
           data-tooltip="Copy URL"
           class="fas fa-link"
        ></i>
        <i v-if="asset.code"
           v-clipboard:copy="asset.code"
           v-clipboard:success="tooltipCopied"
           @mouseenter="tooltipShow"
           @mouseleave="tooltipHide"
           :data-tooltip="asset.codeTitle"
           class="fas fa-code"
        ></i>
        <i v-if="asset.sri"
           v-clipboard:copy="asset.sri"
           v-clipboard:success="tooltipCopied"
           @mouseenter="tooltipShow"
           @mouseleave="tooltipHide"
           data-tooltip="Copy SRI Hash"
           class="fas fa-shield-alt"
        ></i>
        <slot name="after"></slot>
    </div>
</template>

<script>
    import tlite from 'tlite';
    import 'tlite/tlite.css';

    export default {
        name: 'LibraryAssetButtons',
        props: {
            asset: Object,
        },
        methods: {
            tooltipCopied (evt) {
                tlite.hide(evt.trigger);
                evt.trigger.setAttribute('data-tlite', 'Copied!');
                tlite.show(evt.trigger);
                setTimeout(() => {
                    tlite.hide(evt.trigger);
                }, 1000);
            },
            tooltipShow (evt) {
                evt.target.setAttribute('data-tlite', evt.target.getAttribute('data-tooltip'));
                tlite.show(evt.target);
            },
            tooltipHide (evt) {
                tlite.hide(evt.target);
            },
        },
    };
</script>
