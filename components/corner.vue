<template>
    <aside class="corner">
        <div>
            <a :href="utm('https://github.com/cdnjs', 'corner')">
                <p>View on GitHub</p>
                <i class="fab fa-github" aria-hidden="true"></i>
            </a>
        </div>
    </aside>
</template>

<script>
    import utm from '../util/utm';

    export default {
        name: 'Corner',
        methods: {
            utm,
        },
    };
</script>
