<template>
    <section class="breadcrumbs">
        <ul>
            <li v-for="item in breadcrumbs">
                <router-link :to="{ path: item.url}">{{ item.index }}</router-link>
            </li>
        </ul>
    </section>
</template>

<script>
    const breadcrumbs = require('../util/breadcrumbs');

    module.exports = {
        name: 'Breadcrumbs',
        computed: {
            breadcrumbs() {
                return breadcrumbs(this.$route.path);
            },
        },
    };
</script>
