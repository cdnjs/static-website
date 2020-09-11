<template>
    <div class="content">
        <h1>
            Getting a specific version for a library on cdnjs
        </h1>
        <p>
            The <code>/libraries/:library/:version</code> endpoint returns a JSON object with details specific to a
            requested version of a library on cdnjs.
        </p>
        <p>
            The cache lifetime on this endpoint is 355 days, identical to the CDN.
            The response is also marked as immutable, as a version on cdnjs will never change once published.
        </p>
    </div>
</template>

<script>
    export default {
        name: 'APIVersionHeader',
    };
</script>
