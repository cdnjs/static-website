<template>
    <div class="content">
        <h1>
            Getting a specific tutorial for a cdnjs library
        </h1>
        <p>
            The <code>/libraries/:library/tutorials/:tutorial</code> endpoint returns a JSON object containing
            metadata and the content of a specified user-submitted tutorial relating to the specified library hosted
            on cdnjs.
        </p>
        <p>
            The cache lifetime on this endpoint is 2 weeks.
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
        name: 'APITutorialHeader',
    };
</script>
