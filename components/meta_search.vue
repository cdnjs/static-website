<template>
    <div itemscope
         itemtype="https://schema.org/WebSite"
         :style="{ display: 'none', visibility: 'hidden' }"
    >
        <meta itemprop="url" :content="base()" />
        <form itemprop="potentialAction" itemscope itemtype="https://schema.org/SearchAction">
            <meta itemprop="target" :content="`${base()}libraries?q={search_term_string}`" />
            <input itemprop="query-input" type="text" name="search_term_string" required />
            <input type="submit" />
        </form>
    </div>
</template>

<script>
    export default {
        name: 'MetaSearch',
        methods: {
            base() {
                const origin = process.env.SITE_HOST ||
                    (typeof(window) !== "undefined" ? window.location.origin : '/');
                return origin + (origin.endsWith('/') ? '' : '/');
            },
        },
    };
</script>
