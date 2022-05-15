<template>
    <div>
        <h2 id="tutorial">
            Getting a specific tutorial for a cdnjs library
        </h2>
        <div class="doc">
            <div class="callout">
                <ExclamationTriangle class="icon" />
                <div>
                    <p>
                        The <code>/libraries/:library/tutorials/:tutorial</code> endpoint is deprecated.
                        All requests to this endpoint will return a 404.
                    </p>
                    <p>
                        See
                        <a href="https://github.com/cdnjs/cdnjs/issues/14130" target="_blank">
                            cdnjs/cdnjs issue #14130</a>
                        for more information.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ExclamationTriangle from '@fortawesome/fontawesome-free/svgs/solid/exclamation-triangle.svg?inline';

    export default {
        name: 'APITutorial',
        components: {
            ExclamationTriangle,
        },
    };
</script>
