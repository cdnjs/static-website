<template>
    <div class="banner">
        <p>Help support cdnjs</p>
        <p>
            You can <a :href="utm('https://github.com/cdnjs', 'banner')">contribute on
                <font-awesome-icon :icon="faGithub" aria-hidden="true" /> GitHub</a> to help make cdnjs sustainable!

            Or, donate $5 to cdnjs via <a :href="utm('https://opencollective.com/cdnjs', 'banner')">
                Open Collective</a>, <a :href="utm('https://www.patreon.com/cdnjs', 'banner')">Patreon</a>,
            or find out more on our <nuxt-link :to="{ name: 'sponsor' }">
                Sponsor Us page
            </nuxt-link>.
        </p>
    </div>
</template>

<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faGithub } from '@fortawesome/free-brands-svg-icons';
    import utm from '../util/utm';

    export default {
        name: 'Banner',
        components: {
            FontAwesomeIcon,
        },
        data () {
            return {
                faGithub,
            };
        },
        methods: {
            utm,
        },
    };
</script>
