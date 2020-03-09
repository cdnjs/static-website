<template>
    <section>
        <header>
            <Breadcrumbs></Breadcrumbs>
        </header>
        <PrimarySearch></PrimarySearch>
    </section>
</template>

<script>
    import Breadcrumbs from '../components/breadcrumbs';
    import PrimarySearch from '../components/primary_search';

    export default {
        name: 'Libraries',
        components: {
            Breadcrumbs,
            PrimarySearch,
        },
    };
</script>
