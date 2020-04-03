<template>
    <section>
        <header>
            <Breadcrumbs :crumbs="crumbs"></Breadcrumbs>
            <LibraryHero :library="library"></LibraryHero>
        </header>
        <div class="content" v-html="tutorial.html">
        </div>
    </section>
</template>

<script>
    import getLibrary from '../../../../util/get_library';
    import { getTutorial } from '../../../../util/get_tutorial';
    import setMeta from '../../../../util/set_meta';
    import breadcrumbs from '../../../../util/breadcrumbs';
    import Breadcrumbs from '../../../../components/breadcrumbs';
    import LibraryHero from '../../../../components/library_hero';

    const tutorialName = data => (data.tutorial && data.tutorial.name) || data.tutorialName;

    const meta = {
        title (data) {
            return `${tutorialName(data)} - ${data.libraryName} - Libraries`;
        },
        breadcrumb (data) {
            return tutorialName(data);
        },
        classes: [],
    };

    export default {
        name: 'Tutorial',
        meta,
        head () {
            return setMeta(meta, this);
        },
        components: {
            Breadcrumbs,
            LibraryHero,
        },
        async asyncData ({ params, route, app, error }) {
            const data = {
                libraryName: params.library,
                library: null,
                tutorialName: params.tutorial,
                tutorial: null,
                crumbs: [],
            };

            // Attempt to get data for the lib
            let lib;
            try {
                lib = await getLibrary(data.libraryName);
            } catch (e) {
                // If we fail to find it, let the user know
                if (e.message === 'Library not found') {
                    error({
                        statusCode: 404,
                        customMsg: true,
                        message: `Sorry, we could not find the library you requested, ${data.libraryName}.`,
                    });
                } else {
                    error({
                        statusCode: 500,
                        customMsg: true,
                        message: `Sorry, an error occurred whilst loading the library ${data.libraryName}.`,
                    });
                }
                return;
            }

            // Save the lib data
            data.library = lib;

            // Attempt to get data for the tut
            let tut;
            try {
                tut = await getTutorial(data.libraryName, data.tutorialName);
            } catch (e) {
                // If we fail to find it, let the user know
                if (e.message === 'Tutorial not found') {
                    error({
                        statusCode: 404,
                        customMsg: true,
                        message: `Sorry, we could not find the tutorial you requested, ${data.tutorialName} (${data.libraryName}).`,
                    });
                } else {
                    error({
                        statusCode: 500,
                        customMsg: true,
                        message: `Sorry, an error occurred whilst loading the tutorial ${data.tutorialName} (${data.libraryName}).`,
                    });
                }
                return;
            }

            // Save the tut data
            data.tutorial = tut;

            // Breadcrumbs!
            data.crumbs = await breadcrumbs(route, app.router, data);

            return data;
        },
        mounted() {
            console.log(this.$data.tutorial);
        },
    };
</script>
