<template>
    <section>
        <APISidebar></APISidebar>
        <div class="docs-main">
            <header>
                <Breadcrumbs :crumbs="crumbs"></Breadcrumbs>
                <div class="content">
                    <h1>
                        cdnjs provides a simple API to allow anyone to quickly query the libraries we have on the CDN.
                    </h1>
                    <p>
                        We provide two main endpoints, the <code>libraries</code> endpoint which allows anyone to search
                        through the full set of libraries we offer, and the <code>libraries/:library</code> endpoint which
                        allows for detailed data to be ascertained for a specific library.
                    </p>
                </div>
            </header>
            <div class="content">
            </div>
        </div>
    </section>
</template>

<script>
    import Breadcrumbs from '../../components/breadcrumbs';
    import APISidebar from '../../components/api/sidebar';
    import breadcrumbs from '../../util/breadcrumbs';
    import setMeta from '../../util/set_meta';

    const meta = {
        title: 'API Documentation',
        breadcrumb: 'API Documentation',
        desc: 'The cdnjs API allows for easy programmatic navigation of our libraries and tutorials. Read the docs to learn about all the endpoints we offer.',
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
