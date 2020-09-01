<template>
    <section>
        <APISidebar></APISidebar>
        <div class="docs-main">
            <header>
                <Breadcrumbs :crumbs="crumbs"></Breadcrumbs>
                <div class="content">
                    <h1>
                        Getting a specific tutorial for a cdnjs library
                    </h1>
                    <p>
                        The <code>/libraries/:library/tutorials/:tutorial</code> endpoint returns a JSON object containing
                        metadata and the content of a specified user-submitted tutorial relating to the specified library hosted
                        on cdnjs.
                    </p>
                    <p>
                        The cache lifetime on this endpoint is 2 weeks.
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
                <APITutorial></APITutorial>
            </div>
        </div>
    </section>
</template>

<script>
import Breadcrumbs from '../../components/breadcrumbs';
import APISidebar from '../../components/api/sidebar';
import APITutorial from '../../components/api/tutorial';
import breadcrumbs from '../../util/breadcrumbs';
import setMeta from '../../util/set_meta';

const meta = {
    title: 'Get library tutorial - API Documentation',
    breadcrumb: 'Get library tutorial',
    desc: 'Getting a specific tutorial for a cdnjs library - The cdnjs API allows for easy programmatic navigation of our libraries and tutorials. Read the docs to learn about all the endpoints we offer.',
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
        APITutorial,
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
