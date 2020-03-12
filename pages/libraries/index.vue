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

    const meta = {
        title: 'Libraries',
        breadcrumb: 'Libraries',
        classes: [],
    };

    export default {
        name: 'Libraries',
        meta,
        head () {
            return setMeta(meta, this);
        },
        components: {
            Breadcrumbs,
            PrimarySearch,
        },
    };
</script>
