<template>
    <aside class="corner">
        <div>
            <a :href="utm('https://github.com/cdnjs', 'corner')">
                <p>View on GitHub</p>
                <GitHub class="icon" aria-hidden="true"></GitHub>
            </a>
        </div>
    </aside>
</template>

<script>
    import GitHub from '@fortawesome/fontawesome-free/svgs/brands/github.svg?inline';
    import utm from '../util/utm';

    export default {
        name: 'Corner',
        components: {
            GitHub,
        },
        methods: {
            utm,
        },
    };
</script>
