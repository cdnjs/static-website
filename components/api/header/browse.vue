<template>
    <div class="content">
        <h1>
            Browsing all libraries on cdnjs
        </h1>
        <p>
            The <code>/libraries</code> endpoint will return a JSON object with three top-level properties.
        </p>
        <p>
            This API endpoint can also be used to search cdnjs for libraries, by making use of the
            optional <code>search</code> URL query parameter.
        </p>
        <p>
            The cache lifetime on this endpoint is six hours.
        </p>
    </div>
</template>

<script>
    export default {
        name: 'APIBrowseHeader',
    };
</script>
