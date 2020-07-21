<template>
    <section>
        <header>
            <Breadcrumbs :crumbs="crumbs"></Breadcrumbs>
        </header>
        <PrimarySearch></PrimarySearch>
    </section>
</template>

<script>
    import Breadcrumbs from '../../components/breadcrumbs';
    import PrimarySearch from '../../components/primary_search';
    import breadcrumbs from '../../util/breadcrumbs';
    import setMeta from '../../util/set_meta';

    const meta = {
        title: 'Libraries',
        breadcrumb: 'Libraries',
        desc: 'cdnjs offers a large collection of popular libraries for JavaScript, CSS and more. Search the full collection and start using them on your website.',
        classes: [],
    };

    export default {
        name: 'Libraries',
        meta,
        components: {
            Breadcrumbs,
            PrimarySearch,
        },
        async asyncData (data) {
            return {
                crumbs: await breadcrumbs(data.route, data.app.router, {}),
            };
        },
        head () {
            return setMeta(meta, this);
        },
    };
</script>
