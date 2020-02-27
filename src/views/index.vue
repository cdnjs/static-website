<template>
    <main>
        <Nav></Nav>
        <section class="main">
            <a href="https://cdnjs.com"><img src="../assets/logo.svg" alt="cdnjs" /></a>
            <h1>Coming soon</h1>
        </section>
    </main>
</template>

<script>
    const Nav = require('../components/nav');

    module.exports = {
        name: 'Index',
        components: {
            Nav,
        },
    };
</script>
