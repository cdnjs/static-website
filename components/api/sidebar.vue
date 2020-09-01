<template>
    <div class="docs-sidebar">
        <ul>
            <li>
                <h3>Endpoints</h3>
            </li>
            <li>
                <nuxt-link :to="{ name: 'api-browse' }">
                    Get all libraries
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="{ name: 'api-library' }">
                    Get library
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="{ name: 'api-version' }">
                    Get library version
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="{ name: 'api-tutorials' }">
                    Get library tutorials
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="{ name: 'api-tutorial' }">
                    Get library tutorial
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="{ name: 'api-whitelist' }">
                    Get permitted extensions
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="{ name: 'api-stats' }">
                    Get basic statistics
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="{ name: 'api-errors' }">
                    Error responses
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'ApiSidebar',
    };
</script>
