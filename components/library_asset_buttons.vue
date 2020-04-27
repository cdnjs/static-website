<template>
    <div class="library-asset-buttons">
        <slot name="before"></slot>
        <button v-clipboard:copy="asset.url"
                v-clipboard:success="tooltipCopied"
                @mouseenter="tooltipShow"
                @mouseleave="tooltipHide"
                data-tooltip="Copy URL"
                aria-label="Copy URL"
        >
            <Link class="icon" aria-hidden="true"></Link>
        </button>
        <button v-if="asset.code"
                v-clipboard:copy="asset.code"
                v-clipboard:success="tooltipCopied"
                @mouseenter="tooltipShow"
                @mouseleave="tooltipHide"
                :data-tooltip="asset.codeTitle"
                :aria-label="asset.codeTitle"
        >
            <Code class="icon" aria-hidden="true"></Code>
        </button>
        <button v-if="asset.sri"
                v-clipboard:copy="asset.sri"
                v-clipboard:success="tooltipCopied"
                @mouseenter="tooltipShow"
                @mouseleave="tooltipHide"
                data-tooltip="Copy SRI Hash"
                aria-label="Copy SRI Hash"
        >
            <ShieldAlt class="icon" aria-hidden="true"></ShieldAlt>
        </button>
        <slot name="after"></slot>
    </div>
</template>

<script>
    import Code from '@fortawesome/fontawesome-free/svgs/solid/code.svg?inline';
    import Link from '@fortawesome/fontawesome-free/svgs/solid/link.svg?inline';
    import ShieldAlt from '@fortawesome/fontawesome-free/svgs/solid/shield-alt.svg?inline';
    import tlite from 'tlite';
    import 'tlite/tlite.css';

    export default {
        name: 'LibraryAssetButtons',
        components: {
            Code,
            Link,
            ShieldAlt,
        },
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
