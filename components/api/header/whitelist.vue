<template>
    <div class="content">
        <h1>
            Fetch details about the cdnjs file extension whitelist
        </h1>
        <p>
            The <code>/whitelist</code> endpoint returns a JSON object containing a list of extensions permitted on
            the CDN as well as categories for those extensions.
        </p>
        <p>
            The cache lifetime on this endpoint is 6 hours.
        </p>
    </div>
</template>

<script>
    export default {
        name: 'APIWhitelistHeader',
    };
</script>
