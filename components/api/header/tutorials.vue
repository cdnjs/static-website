<template>
    <div class="content">
        <h1>
            Listing all tutorials for a library on cdnjs
        </h1>
        <p>
            The <code>/libraries/:library/tutorials</code> endpoint returns a JSON array containing all the
            user-submitted tutorials relating to this library on cdnjs. This is a mirror of the
            <code>tutorials</code> property returned from the main library endpoint.
        </p>
        <p>
            The cache lifetime on this endpoint is 24 hours.
        </p>
        <p>
            <small>
                <i>
                    Alongside the properties listed here, there may be other optional properties available based on
                    the metadata available in each source tutorial file.
                </i>
            </small>
        </p>
    </div>
</template>

<script>
    export default {
        name: 'APITutorialsHeader',
    };
</script>
