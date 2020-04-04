<template>
    <section>
        <header>
            <Breadcrumbs :crumbs="crumbs"></Breadcrumbs>
            <TutorialHero :library="libraryName" :tutorial="tutorial"></TutorialHero>
        </header>
        <div class="content row">
            <div class="contents"></div>
            <div v-html="rendered" class="tutorial"></div>
        </div>
    </section>
</template>

<script>
    import MarkdownIt from 'markdown-it';
    import MarkdownItPrism from 'markdown-it-prism';
    import 'prismjs/themes/prism-tomorrow.css';
    import 'prismjs/plugins/autolinker/prism-autolinker';
    import 'prismjs/plugins/autolinker/prism-autolinker.css';
    import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';
    import 'prismjs/plugins/toolbar/prism-toolbar';
    import 'prismjs/plugins/toolbar/prism-toolbar.css';
    import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
    import 'prismjs/plugins/match-braces/prism-match-braces';
    import 'prismjs/plugins/match-braces/prism-match-braces.css';

    import { getTutorial } from '../../../../util/get_tutorial';
    import setMeta from '../../../../util/set_meta';
    import breadcrumbs from '../../../../util/breadcrumbs';
    import Breadcrumbs from '../../../../components/breadcrumbs';
    import TutorialHero from '../../../../components/tutorial_hero';

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
            TutorialHero,
        },
        computed: {
            rendered () {
                const md = MarkdownIt({
                    html: true,
                    linkify: true,
                    typographer: true,
                    langPrefix: 'match-braces language-',
                }).use(MarkdownItPrism);
                return md.render(this.$data.tutorial.markdown);
            },
        },
        async asyncData ({ params, route, app, error }) {
            const data = {
                libraryName: params.library,
                tutorialName: params.tutorial,
                tutorial: null,
                crumbs: [],
            };

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
            // Get latest data in the background (SSR may be old or incomplete)
            getTutorial(this.$data.libraryName, this.$data.tutorialName).then(tut => {
                if (tut) {
                    this.$data.tutorial = tut;
                }
            }).catch(() => {});
        }
    };
</script>
