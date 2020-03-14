<template>
    <section>
        <header>
            <Breadcrumbs :crumbs="crumbs"></Breadcrumbs>
        </header>
        <div class="content">
            <!-- TODO: content here! -->
        </div>
    </section>
</template>

<script>
    import Breadcrumbs from '../components/breadcrumbs';
    import breadcrumbs from '../util/breadcrumbs';
    import setMeta from '../util/set_meta';

    const meta = {
        title: 'Sponsor Us',
        breadcrumb: 'Sponsor Us',
        classes: [],
    };

    export default {
        name: 'Sponsor',
        meta,
        head () {
            return setMeta(meta, this);
        },
        components: {
            Breadcrumbs,
        },
        async asyncData (data) {
            return {
                crumbs: await breadcrumbs(data.route, data.app.router, {}),
            };
        },
    };
</script>
