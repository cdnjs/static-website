<template>
    <section>
        <header>
            <Breadcrumbs :crumbs="crumbs"></Breadcrumbs>
            <div class="content tutorials-hero">
                <h1>
                    Tutorials for
                    <nuxt-link :to="{ name: 'libraries-library', params: { library: libraryName } }">
                        {{ libraryName }}
                    </nuxt-link>
                </h1>
            </div>
        </header>
        <div class="content">
            <TutorialList :library="libraryName" :tutorials="tutorials" :single-page="true"></TutorialList>
        </div>
    </section>
</template>

<script>
    import { getTutorials } from '../../../../util/get_tutorial';
    import setMeta from '../../../../util/set_meta';
    import breadcrumbs from '../../../../util/breadcrumbs';
    import Breadcrumbs from '../../../../components/breadcrumbs';
    import TutorialList from '../../../../components/tutorial/tutorial_list';

    const meta = {
        title (data) {
            return `Tutorials - ${data.libraryName} - Libraries`;
        },
        breadcrumb: 'Tutorials',
        desc (data) {
            return `Learn about ${data.libraryName} with the tutorials that cdnjs provides, or contribute your own via our GitHub repository.`;
        },
        classes: [],
    };

    export default {
        name: 'Tutorials',
        meta,
        components: {
            Breadcrumbs,
            TutorialList,
        },
        async asyncData ({ params, route, app, payload }) {
            const data = {
                libraryName: params.library,
                tutorials: {},
            };

            // Attempt to get tutorial data for the lib
            if (payload) {
                data.tutorials = payload;
            } else {
                let tuts;
                try {
                    tuts = await getTutorials(data.libraryName);
                } catch (_) {
                    // If we fail to load them, default to none
                }

                // Save tutorials
                if (tuts) {
                    data.tutorials = tuts;
                }
            }

            // Breadcrumbs!
            data.crumbs = await breadcrumbs(route, app.router, data);

            return data;
        },
        head () {
            return setMeta(meta, this);
        },
    };
</script>
