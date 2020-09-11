<template>
    <div class="content">
        <h1>
            Getting a specific library on cdnjs
        </h1>
        <p>
            The <code>/libraries/:library</code> endpoint allows for data on a specific library to be
            requested and will return a JSON object with all library data properties by default.
        </p>
        <p>
            The cache lifetime on this endpoint is six hours.
        </p>
    </div>
</template>

<script>
    export default {
        name: 'APILibraryHeader',
    };
</script>
