<template>
    <section>
        <APISidebar></APISidebar>
        <div class="docs-main">
            <header>
                <Breadcrumbs :crumbs="crumbs"></Breadcrumbs>
                <div class="content">
                    <h1>
                        Browsing all libraries on cdnjs
                    </h1>
                    <p>
                        The <code>/libraries</code> endpoint will return a JSON object with three top-level properties.
                    </p>
                    <p>
                        This API endpoint can also be used to search cdnjs for libraries, by making use of the
                        optional <code>search</code> URL query parameter.
                    </p>
                    <p>
                        The cache lifetime on this endpoint is six hours.
                    </p>
                </div>
            </header>
            <div class="content">
                <APIBrowse></APIBrowse>
            </div>
        </div>
    </section>
</template>

<script>
import Breadcrumbs from '../../components/breadcrumbs';
import APISidebar from '../../components/api/sidebar';
import APIBrowse from '../../components/api/browse';
import breadcrumbs from '../../util/breadcrumbs';
import setMeta from '../../util/set_meta';

const meta = {
    title: 'Get all libraries - API Documentation',
    breadcrumb: 'Get all libraries',
    desc: 'Browsing all libraries on cdnjs - The cdnjs API allows for easy programmatic navigation of our libraries and tutorials. Read the docs to learn about all the endpoints we offer.',
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
        APIBrowse,
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
