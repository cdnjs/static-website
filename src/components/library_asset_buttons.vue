<template>
    <div class="library-asset-buttons" name="copied">
        <Tippy to="copied" :visible="tippyShow" trigger="manual" hide-on-click="false">
            {{ tippyText }}
        </Tippy>
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
    </div>
</template>

<script>
    const Tippy = require('vue-tippy').TippyComponent;

    module.exports = {
        name: 'LibraryAssetButtons',
        props: {
            asset: Object,
        },
        components: {
            Tippy,
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
