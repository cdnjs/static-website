<template>
    <component is="script" v-html="content"></component>
</template>

<script>
    export default {
        name: 'Script',
        computed: {
            content () {
                if (this.$slots.default && this.$slots.default.length) { return this.$slots.default[0].text; }
                return '';
            },
        },
    };
</script>
