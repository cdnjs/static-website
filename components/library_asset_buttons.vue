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
            <font-awesome-icon :icon="faLink" aria-hidden="true" />
        </button>
        <button v-if="asset.code"
                v-clipboard:copy="asset.code"
                v-clipboard:success="tooltipCopied"
                @mouseenter="tooltipShow"
                @mouseleave="tooltipHide"
                :data-tooltip="asset.codeTitle"
                :aria-label="asset.codeTitle"
        >
            <font-awesome-icon :icon="faCode" aria-hidden="true" />
        </button>
        <button v-if="asset.sri"
                v-clipboard:copy="asset.sri"
                v-clipboard:success="tooltipCopied"
                @mouseenter="tooltipShow"
                @mouseleave="tooltipHide"
                data-tooltip="Copy SRI Hash"
                aria-label="Copy SRI Hash"
        >
            <font-awesome-icon :icon="faShieldAlt" aria-hidden="true" />
        </button>
        <slot name="after"></slot>
    </div>
</template>

<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faCode, faLink, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
    import tlite from 'tlite';
    import 'tlite/tlite.css';

    export default {
        name: 'LibraryAssetButtons',
        components: {
            FontAwesomeIcon,
        },
        props: {
            asset: Object,
        },
        data () {
            return {
                faLink,
                faCode,
                faShieldAlt,
            };
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
