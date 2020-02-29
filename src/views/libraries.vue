<template>
    <section>
        <header>
            <Breadcrumbs></Breadcrumbs>
        </header>
        <PrimarySearch></PrimarySearch>
    </section>
</template>

<script>
    const Breadcrumbs = require('../components/breadcrumbs');
    const PrimarySearch = require('../components/primary_search');

    module.exports = {
        name: 'Libraries',
        components: {
            Breadcrumbs,
            PrimarySearch,
        },
    };
</script>
