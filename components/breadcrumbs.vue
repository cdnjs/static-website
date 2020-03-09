<template>
    <div class="content breadcrumbs">
        <ul>
            <li v-for="item in breadcrumbs">
                <router-link :to="{ path: item.url}">
                    {{ item.index }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import breadcrumbs from '../util/breadcrumbs';

    export default {
        name: 'Breadcrumbs',
        computed: {
            breadcrumbs() {
                return breadcrumbs(this);
            },
        },
    };
</script>
