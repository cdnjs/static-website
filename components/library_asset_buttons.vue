<template>
    <div class="library-asset-buttons" name="copied">
        <Tippy :visible="tippyShow" to="copied" trigger="manual" hide-on-click="false">
            {{ tippyText }}
        </Tippy>
        <slot name="before"></slot>
        <i v-clipboard:copy="asset.url"
           v-clipboard:success="onCopy"
           v-tippy
           content="Copy URL"
           class="fas fa-link"
        ></i>
        <i v-if="asset.code"
           v-clipboard:copy="asset.code"
           v-clipboard:success="onCopy"
           v-tippy
           :content="asset.codeTitle"
           class="fas fa-code"
        ></i>
        <i v-if="asset.sri"
           v-clipboard:copy="asset.sri"
           v-clipboard:success="onCopy"
           v-tippy
           content="Copy SRI Hash"
           class="fas fa-shield-alt"
        ></i>
        <slot name="after"></slot>
    </div>
</template>

<script>
    import TippyComponent from 'vue-tippy';

    export default {
        name: 'LibraryAssetButtons',
        props: {
            asset: Object,
        },
        components: {
            Tippy: TippyComponent,
        },
        data() {
            return {
                tippyText: null,
                tippyShow: false,
            };
        },
        methods: {
            onCopy() {
                this.$data.tippyText = 'Copied!';
                this.$data.tippyShow = true;
                setTimeout(() => {
                    this.$data.tippyShow = false;
                }, 1000);
            },
        },
    };
</script>
