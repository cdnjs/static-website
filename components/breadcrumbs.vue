<template>
    <div class="content breadcrumbs">
        <ul>
            <li v-for="item in breadcrumbs">
                <nuxt-link :to="{ path: item.url}">
                    {{ item.index }}
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import breadcrumbs from '../util/breadcrumbs';

    export default {
        name: 'Breadcrumbs',
        computed: {
            breadcrumbs () {
                return breadcrumbs(this.$nuxt.context.route, this.$nuxt.context.app.router, this.$parent.$data);
            },
        },
    };
</script>
