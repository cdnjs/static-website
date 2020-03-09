<template>
    <section>
        <header>
            <Breadcrumbs></Breadcrumbs>
        </header>
        <PrimarySearch></PrimarySearch>
    </section>
</template>

<script>
    import Breadcrumbs from '../../components/breadcrumbs';
    import PrimarySearch from '../../components/primary_search';

    export default {
        name: 'Libraries',
        meta: {
            title: 'Libraries',
            breadcrumb: 'Libraries',
            classes: [],
        },
        components: {
            Breadcrumbs,
            PrimarySearch,
        },
    };
</script>
