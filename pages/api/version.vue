<template>
    <section>
        <APISidebar></APISidebar>
        <div class="docs-main">
            <header>
                <Breadcrumbs :crumbs="crumbs"></Breadcrumbs>
                <div class="content">
                    <h1>
                        Getting a specific version for a library on cdnjs
                    </h1>
                    <p>
                        The <code>/libraries/:library/:version</code> endpoint returns a JSON object with details specific to a
                        requested version of a library on cdnjs.
                    </p>
                    <p>
                        The cache lifetime on this endpoint is 355 days, identical to the CDN.
                        The response is also marked as immutable, as a version on cdnjs will never change once published.
                    </p>
                </div>
            </header>
            <div class="content">
                <APIVersion></APIVersion>
            </div>
        </div>
    </section>
</template>

<script>
import Breadcrumbs from '../../components/breadcrumbs';
import APISidebar from '../../components/api/sidebar';
import APIVersion from '../../components/api/version';
import breadcrumbs from '../../util/breadcrumbs';
import setMeta from '../../util/set_meta';

const meta = {
    title: 'Get library version - API Documentation',
    breadcrumb: 'Get library version',
    desc: 'Getting a specific version for a library on cdnjs - The cdnjs API allows for easy programmatic navigation of our libraries and tutorials. Read the docs to learn about all the endpoints we offer.',
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
        APIVersion,
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
