<template>
    <section>
        <APISidebar></APISidebar>
        <div class="docs-main">
            <header>
                <Breadcrumbs :crumbs="crumbs"></Breadcrumbs>
                <div class="content">
                    <h1>
                        Listing all tutorials for a library on cdnjs
                    </h1>
                    <p>
                        The <code>/libraries/:library/tutorials</code> endpoint returns a JSON array containing all the
                        user-submitted tutorials relating to this library on cdnjs. This is a mirror of the
                        <code>tutorials</code> property returned from the main library endpoint.
                    </p>
                    <p>
                        The cache lifetime on this endpoint is 24 hours.
                    </p>
                    <p>
                        <small>
                            <i>
                                Alongside the properties listed here, there may be other optional properties available based on
                                the metadata available in each source tutorial file.
                            </i>
                        </small>
                    </p>
                </div>
            </header>
            <div class="content">
                <APITutorials></APITutorials>
            </div>
        </div>
    </section>
</template>

<script>
    import Breadcrumbs from '../../components/breadcrumbs';
    import APISidebar from '../../components/api/sidebar';
    import APITutorials from '../../components/api/tutorials';
    import breadcrumbs from '../../util/breadcrumbs';
    import setMeta from '../../util/set_meta';

    const meta = {
        title: 'Get library tutorials - API Documentation',
        breadcrumb: 'Get library tutorials',
        desc: 'Listing all tutorials for a library on cdnjs - The cdnjs API allows for easy programmatic navigation of our libraries and tutorials. Read the docs to learn about all the endpoints we offer.',
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
            APITutorials,
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
