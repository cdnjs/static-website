<template>
    <div class="json-example">
        <div class="select">
            <a @click="raw" :class="showRaw ? 'active' : ''">Raw</a>
            <a @click="formatted" :class="showRaw ? '' : 'active'">Formatted</a>
        </div>
        <pre v-if="showRaw"><code><slot></slot></code></pre>
        <Prism v-else :code="pretty" language="json"></Prism>
    </div>
</template>

<script>
    import 'prismjs';
    import 'prismjs/themes/prism-tomorrow.css';
    import 'prismjs/components/prism-json';
    import Prism from 'vue-prism-component';

    export default {
        name: 'JSONExample',
        components: {
            Prism,
        },
        data () {
            return {
                showRaw: true,
            };
        },
        computed: {
            pretty () {
                if (!this.$slots.default || !this.$slots.default.length || !this.$slots.default[0].text) { return ''; }
                try {
                    return JSON.stringify(JSON.parse(this.$slots.default[0].text), null, 2);
                } catch (_) {
                    return this.$slots.default[0].text;
                }
            },
        },
        methods: {
            raw () {
                this.$data.showRaw = true;
            },
            formatted () {
                this.$data.showRaw = false;
            },
        },
    };
</script>
