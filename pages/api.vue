<template>
    <section>
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
                <ul>
                    <li><small>Endpoints</small></li>
                    <li>
                        <a href="#browse">Browsing all libraries on cdnjs</a>
                    </li>
                    <li>
                        <a href="#library">Getting a specific library on cdnjs</a>
                    </li>
                    <li>
                        <a href="#version">Getting a specific version for a library on cdnjs</a>
                    </li>
                    <li>
                        <a href="#tutorials">Listing all tutorials for a library on cdnjs</a>
                    </li>
                    <li>
                        <a href="#tutorial">Getting a specific tutorial for a cdnjs library</a>
                    </li>
                    <li>
                        <a href="#whitelist">Fetch details about the cdnjs file extension whitelist</a>
                    </li>
                    <li>
                        <a href="#stats">Fetch basic statistics for cdnjs</a>
                    </li>
                    <li>
                        <a href="#errors">Error responses from the cdnjs API</a>
                    </li>
                </ul>
            </div>
        </header>
        <div class="content">
            <APIBrowse></APIBrowse>
            <APILibrary></APILibrary>
            <APIVersion></APIVersion>
            <APITutorials></APITutorials>
            <APITutorial></APITutorial>
            <APIWhitelist></APIWhitelist>
            <APIStats></APIStats>
            <APIErrors></APIErrors>
        </div>
    </section>
</template>

<script>
    import Breadcrumbs from '../components/breadcrumbs';
    import APIBrowse from '../components/api/browse';
    import APILibrary from '../components/api/library';
    import APIVersion from '../components/api/version';
    import APITutorials from '../components/api/tutorials';
    import APITutorial from '../components/api/tutorial';
    import APIWhitelist from '../components/api/whitelist';
    import APIStats from '../components/api/stats';
    import APIErrors from '../components/api/errors';
    import breadcrumbs from '../util/breadcrumbs';
    import setMeta from '../util/set_meta';

    const meta = {
        title: 'API Documentation',
        breadcrumb: 'API Documentation',
        desc: 'The cdnjs API allows for easy programmatic navigation of our libraries and tutorials. Read the docs to learn about all the endpoints we offer.',
        classes: [],
    };

    export default {
        name: 'API',
        meta,
        components: {
            Breadcrumbs,
            APIBrowse,
            APILibrary,
            APIVersion,
            APITutorials,
            APITutorial,
            APIWhitelist,
            APIStats,
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
