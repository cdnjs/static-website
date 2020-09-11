<template>
    <section>
        <APISidebar></APISidebar>
        <div class="docs-main">
            <header>
                <Breadcrumbs :crumbs="crumbs"></Breadcrumbs>
                <APIErrorsHeader></APIErrorsHeader>
            </header>
            <div class="content">
                <APIErrors></APIErrors>
            </div>
        </div>
    </section>
</template>

<script>
    import Breadcrumbs from '../../components/breadcrumbs';
    import APISidebar from '../../components/api/sidebar';
    import APIErrorsHeader from '../../components/api/header/errors';
    import APIErrors from '../../components/api/errors';
    import breadcrumbs from '../../util/breadcrumbs';
    import setMeta from '../../util/set_meta';

    const meta = {
        title: 'Error responses - API Documentation',
        breadcrumb: 'Error responses',
        desc: 'Error responses from the cdnjs API - The cdnjs API allows for easy programmatic navigation of our libraries and tutorials. Read the docs to learn about all the endpoints we offer.',
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
            APIErrorsHeader,
            APIErrors,
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
