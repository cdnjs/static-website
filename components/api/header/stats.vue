<template>
    <div class="content">
        <h1>
            Fetch basic statistics for cdnjs
        </h1>
        <p>
            The <code>/stats</code> endpoint returns a JSON object containing a set of statistics relating to cdnjs.
        </p>
        <p>
            The cache lifetime on this endpoint is 6 hours.
        </p>
    </div>
</template>

<script>
    export default {
        name: 'APIStatsHeader',
    };
</script>
