<template>
    <div class="banner">
        <p>Help support cdnjs</p>
        <p>
            You can <a :href="utm('https://github.com/cdnjs', 'banner')">contribute on
                <i class="fab fa-github" aria-hidden="true"></i> GitHub</a> to help make cdnjs sustainable!

            Or, donate $5 to cdnjs via <a :href="utm('https://opencollective.com/cdnjs', 'banner')">
                Open Collective</a>, <a :href="utm('https://www.patreon.com/cdnjs', 'banner')">Patreon</a>,
            or find out more on our <nuxt-link :to="{ name: 'sponsor' }">
                Sponsor Us page
            </nuxt-link>.
        </p>
    </div>
</template>

<script>
    import utm from '../util/utm';

    export default {
        name: 'Banner',
        methods: {
            utm,
        },
    };
</script>
