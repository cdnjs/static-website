<template>
    <div :style="{ display: 'none', visibility: 'hidden' }">
        <client-only>
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-139601399-3"></script>
            <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'UA-139601399-3');
            </script>
        </client-only>
    </div>
</template>

<script>
    import ClientOnly from 'vue-client-only';

    export default {
        name: 'GoogleAnalytics',
        components: {
            ClientOnly,
        },
    };
</script>
