<template>
    <section>
        <APISidebar></APISidebar>
        <div class="docs-main">
            <header>
                <Breadcrumbs :crumbs="crumbs"></Breadcrumbs>
                <APIWhitelistHeader></APIWhitelistHeader>
            </header>
            <div class="content">
                <APIWhitelist></APIWhitelist>
            </div>
        </div>
    </section>
</template>

<script>
    import Breadcrumbs from '../../components/breadcrumbs';
    import APISidebar from '../../components/api/sidebar';
    import APIWhitelistHeader from '../../components/api/header/whitelist';
    import APIWhitelist from '../../components/api/whitelist';
    import breadcrumbs from '../../util/breadcrumbs';
    import setMeta from '../../util/set_meta';

    const meta = {
        title: 'Get permitted extensions - API Documentation',
        breadcrumb: 'Get permitted extensions',
        desc: 'Fetch details about the cdnjs file extension whitelist - The cdnjs API allows for easy programmatic navigation of our libraries and tutorials. Read the docs to learn about all the endpoints we offer.',
        classes: [
            'api-docs',
        ],
    };

    export default {
        name: 'API',
        meta,
        components: {
            Breadcrumbs,
            APISidebar,
            APIWhitelistHeader,
            APIWhitelist,
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
