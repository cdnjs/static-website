<template>
    <div class="content breadcrumbs">
        <ul>
            <li v-for="item in crumbs">
                <nuxt-link :to="{ path: item.url}">
                    {{ item.index }}
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Breadcrumbs',
        props: {
            crumbs: Array,
        },
        mounted() {
            console.log(this.$props.crumbs)
        }
    };
</script>
