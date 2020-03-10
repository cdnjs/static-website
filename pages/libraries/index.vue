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
    import setMeta from '../../util/set_meta';

    export default {
        name: 'Libraries',
        meta: {
            title: 'Libraries',
            breadcrumb: 'Libraries',
            classes: [],
        },
        head () {
            return setMeta(this.$nuxt.context);
        },
        components: {
            Breadcrumbs,
            PrimarySearch,
        },
    };
</script>
