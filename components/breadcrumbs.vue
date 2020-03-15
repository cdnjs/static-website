<template>
    <div class="content breadcrumbs">
        <ol itemscope itemtype="http://schema.org/BreadcrumbList">
            <li v-for="item in crumbs" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                <nuxt-link :to="{ path: item.url}" itemprop="item">
                    <span itemprop="name">{{ item.index }}</span>
                </nuxt-link>
                <meta itemprop="position" :content="item.position" />
            </li>
        </ol>
    </div>
</template>

<script>
    export default {
        name: 'Breadcrumbs',
        props: {
            crumbs: Array,
        },
    };
</script>
