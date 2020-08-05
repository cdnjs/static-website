<template>
    <div class="library-asset-buttons">
        <slot name="before"></slot>
        <button v-if="asset.url"
                v-clipboard:copy="asset.url"
                v-clipboard:success="tooltipCopied"
                data-tooltip="Copy URL"
                aria-label="Copy URL"
                @mouseenter="tooltipShow"
                @mouseleave="tooltipHide"
        >
            <Link class="icon" aria-hidden="true"></Link>
        </button>
        <button v-if="asset.code"
                v-clipboard:copy="asset.code"
                v-clipboard:success="tooltipCopied"
                :data-tooltip="asset.codeTitle"
                :aria-label="asset.codeTitle"
                @mouseenter="tooltipShow"
                @mouseleave="tooltipHide"
        >
            <Code class="icon" aria-hidden="true"></Code>
        </button>
        <button v-if="asset.sri"
                v-clipboard:copy="asset.sri"
                v-clipboard:success="tooltipCopied"
                data-tooltip="Copy SRI Hash"
                aria-label="Copy SRI Hash"
                @mouseenter="tooltipShow"
                @mouseleave="tooltipHide"
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
