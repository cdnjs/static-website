<template>
    <div class="banner">
        <p>Help support cdnjs</p>
        <p>
            You can <a href="https://github.com/cdnjs/">contribute on <i class="fab fa-github" aria-hidden="true"></i>
            GitHub</a> to help make cdnjs sustainable!

            Or, donate $5 to cdnjs via <a href="https://opencollective.com/cdnjs">Open Collective</a>,
            <a href="https://www.patreon.com/cdnjs">Patreon</a>, or find out more on our
            <nuxt-link :to="{ name: 'sponsor' }">
                Sponsor Us page
            </nuxt-link>.
        </p>
    </div>
</template>

<script>
    export default {
        name: 'Banner',
    };
</script>
