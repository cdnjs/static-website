<template>
    <div>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=UA-139601399-3"></Script>
        <Script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-139601399-3');
        </Script>
    </div>
</template>

<script>
    import Script from './script';

    export default {
        name: 'GoogleAnalytics',
        components: {
            Script,
        },
    };
</script>
