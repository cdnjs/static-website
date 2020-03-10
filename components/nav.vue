<template>
    <nav class="nav">
        <div class="left">
            <nuxt-link :to="{ name: 'index' }" class="logo">
                <img src="../assets/img/logo.svg" alt="< cdnjs >" />
            </nuxt-link>
            <a href="https://twitter.com/cdnjs"><i class="fab fa-twitter"></i></a>
            <a href="https://cdnjs.discourse.group/"><i class="fab fa-discourse"></i></a>
        </div>

        <div class="middle">
            <slot></slot>
        </div>

        <div class="right">
            <nuxt-link :to="{ name: 'about' }">
                About
            </nuxt-link>
            <nuxt-link :to="{ name: 'libraries' }">
                Libraries
            </nuxt-link>
            <nuxt-link :to="{ name: 'api' }">
                API
            </nuxt-link>
            <a href="https://github.com/cdnjs">GitHub</a>
            <a href="https://status.cdnjs.com">Status</a>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'Nav',
    };
</script>
