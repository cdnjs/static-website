<template>
    <nav class="nav">
        <div class="left">
            <router-link to="/" class="logo"><img src="../assets/logo.svg" alt="< cdnjs >" /></router-link>
            <a href="https://twitter.com/cdnjs"><i class="fab fa-twitter"></i></a>
            <a href="https://cdnjs.discourse.group/"><i class="fab fa-discourse"></i></a>
        </div>

        <div class="middle">
            <slot></slot>
        </div>

        <div class="right">
            <router-link to="/about">About</router-link>
            <router-link to="/libraries">Libraries</router-link>
            <router-link to="/api">API</router-link>
            <a href="https://github.com/cdnjs">GitHub</a>
            <a href="https://status.cdnjs.com">Status</a>
        </div>
    </nav>
</template>
