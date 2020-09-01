<template>
    <section>
        <APISidebar></APISidebar>
        <div class="docs-main">
            <header>
                <Breadcrumbs :crumbs="crumbs"></Breadcrumbs>
                <div class="content">
                    <h1>
                        Fetch basic statistics for cdnjs
                    </h1>
                    <p>
                        The <code>/stats</code> endpoint returns a JSON object containing a set of statistics relating to cdnjs.
                    </p>
                    <p>
                        The cache lifetime on this endpoint is 6 hours.
                    </p>
                </div>
            </header>
            <div class="content">
                <APIStats></APIStats>
            </div>
        </div>
    </section>
</template>

<script>
import Breadcrumbs from '../../components/breadcrumbs';
import APISidebar from '../../components/api/sidebar';
import APIStats from '../../components/api/stats';
import breadcrumbs from '../../util/breadcrumbs';
import setMeta from '../../util/set_meta';

const meta = {
    title: 'Get basic statistics - API Documentation',
    breadcrumb: 'Get basic statistics',
    desc: 'Fetch basic statistics for cdnjs - The cdnjs API allows for easy programmatic navigation of our libraries and tutorials. Read the docs to learn about all the endpoints we offer.',
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
        APIStats,
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
