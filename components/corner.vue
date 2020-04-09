<template>
    <aside class="corner">
        <div>
            <a :href="utm('https://github.com/cdnjs', 'corner')">
                <p>View on GitHub</p>
                <font-awesome-icon :icon="faGithub" aria-hidden="true" />
            </a>
        </div>
    </aside>
</template>

<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faGithub } from '@fortawesome/free-brands-svg-icons';
    import utm from '../util/utm';

    export default {
        name: 'Corner',
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
