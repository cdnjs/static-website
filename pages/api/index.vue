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

            <APIBrowseHeader class="docs-desc"></APIBrowseHeader>
            <div class="content">
                <nuxt-link :to="{ name: 'api-browse' }" class="button">
                    View endpoint
                </nuxt-link>
            </div>

            <APILibraryHeader class="docs-desc"></APILibraryHeader>
            <div class="content">
                <nuxt-link :to="{ name: 'api-library' }" class="button">
                    View endpoint
                </nuxt-link>
            </div>

            <APIVersionHeader class="docs-desc"></APIVersionHeader>
            <div class="content">
                <nuxt-link :to="{ name: 'api-version' }" class="button">
                    View endpoint
                </nuxt-link>
            </div>

            <APITutorialsHeader class="docs-desc"></APITutorialsHeader>
            <div class="content">
                <nuxt-link :to="{ name: 'api-tutorials' }" class="button">
                    View endpoint
                </nuxt-link>
            </div>

            <APITutorialHeader class="docs-desc"></APITutorialHeader>
            <div class="content">
                <nuxt-link :to="{ name: 'api-tutorial' }" class="button">
                    View endpoint
                </nuxt-link>
            </div>

            <APIWhitelistHeader class="docs-desc"></APIWhitelistHeader>
            <div class="content">
                <nuxt-link :to="{ name: 'api-whitelist' }" class="button">
                    View endpoint
                </nuxt-link>
            </div>

            <APIStatsHeader class="docs-desc"></APIStatsHeader>
            <div class="content">
                <nuxt-link :to="{ name: 'api-stats' }" class="button">
                    View endpoint
                </nuxt-link>
            </div>

            <APIErrorsHeader class="docs-desc"></APIErrorsHeader>
            <div class="content">
                <nuxt-link :to="{ name: 'api-errors' }" class="button">
                    View endpoint
                </nuxt-link>
            </div>
        </div>
    </section>
</template>

<script>
    import Breadcrumbs from '../../components/breadcrumbs';
    import APISidebar from '../../components/api/sidebar';
    import APIBrowseHeader from '../../components/api/header/browse';
    import APILibraryHeader from '../../components/api/header/library';
    import APIVersionHeader from '../../components/api/header/version';
    import APITutorialsHeader from '../../components/api/header/tutorials';
    import APITutorialHeader from '../../components/api/header/tutorial';
    import APIWhitelistHeader from '../../components/api/header/whitelist';
    import APIStatsHeader from '../../components/api/header/stats';
    import APIErrorsHeader from '../../components/api/header/errors';
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
            APIBrowseHeader,
            APILibraryHeader,
            APIVersionHeader,
            APITutorialsHeader,
            APITutorialHeader,
            APIWhitelistHeader,
            APIStatsHeader,
            APIErrorsHeader,
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
