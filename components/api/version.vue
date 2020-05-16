<template>
    <div>
        <h2 id="version">
            Getting a specific version for a library on cdnjs
        </h2>
        <div class="doc">
            <p>
                The <code>/libraries/:library/:version</code> endpoint returns a JSON object with details specific to a
                requested version of a library on cdnjs.
            </p>
            <p>
                The cache lifetime on this endpoint is 355 days, identical to the CDN.
                The response is also marked as immutable, as a version on cdnjs will never change once published.
            </p>

            <h3>Query Parameters</h3>
            <table>
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Type</th>
                        <th>Required</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="field in query">
                        <td><code class="key">{{ field.param }}</code></td>
                        <td><code class="key">{{ field.type }}</code></td>
                        <td><code class="key">{{ field.req ? 'required' : 'optional' }}</code></td>
                        <td>
                            <p v-for="desc in field.desc" v-html="desc"></p>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h3>JSON Response</h3>
            <table>
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="field in response">
                        <td><code class="key">{{ field.prop }}</code></td>
                        <td>
                            <template v-for="type in field.type">
                                <code class="key">{{ type }}</code>&nbsp;
                            </template>
                        </td>
                        <td>
                            <p v-for="desc in field.desc" v-html="desc"></p>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h3>Example Requests</h3>

            <h4>
                <a href="https://api.cdnjs.com/libraries/jquery/3.5.1">
                    <code class="key">https://api.cdnjs.com/libraries/jquery/3.5.1</code>
                </a>
            </h4>
            <JSONExample>{"name":"jquery","version":"3.5.1","rawFiles":["jquery.js","jquery.min.js","jquery.min.map","jquery.slim.js","jquery.slim.min.js","jquery.slim.min.map"],"files":["jquery.js","jquery.min.js","jquery.min.map","jquery.slim.js","jquery.slim.min.js","jquery.slim.min.map"],"sri":{"jquery.js":"sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=","jquery.min.js":"sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=","jquery.slim.js":"sha256-DrT5NfxfbHvMHux31Lkhxg42LY6of8TaYyK50jnxRnM=","jquery.slim.min.js":"sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs="}}</JSONExample>

            <h4>
                <a href="https://api.cdnjs.com/libraries/vue/2.6.11?fields=files,sri">
                    <code class="key">https://api.cdnjs.com/libraries/vue/2.6.11?fields=files,sri</code>
                </a>
            </h4>
            <JSONExample>{"files":["vue.common.dev.js","vue.common.js","vue.common.prod.js","vue.esm.browser.js","vue.esm.browser.min.js","vue.esm.js","vue.js","vue.min.js","vue.runtime.common.dev.js","vue.runtime.common.js","vue.runtime.common.prod.js","vue.runtime.esm.js","vue.runtime.js","vue.runtime.min.js"],"sri":{"vue.common.dev.js":"sha256-soI/D3XnqcarOMK229d8GWs8P+gYViEsbWBeMaRoSPk=","vue.common.js":"sha256-G3CZay/nob7tG4ai5FI/O2sYakyatJ+0uknDnG3PSOc=","vue.common.prod.js":"sha256-L5CcYf/nJAyrA48AanDrEMdYitv4IL63aLL2geeCbEg=","vue.esm.browser.js":"sha256-HZGk4wNx/Sr9icBC5/ICwETaEvUvlcfCFwV0A4FgcU4=","vue.esm.browser.min.js":"sha256-2vv0EVENz4Azm6KkclYqEr1Hlk1GTTle9oFlZzBmdg0=","vue.esm.js":"sha256-ZbWf3bBKhQRGjg6NxSziPDQQrdPVIEp3yTYKQuMDBNk=","vue.js":"sha256-NSuqgY2hCZJUN6hDMFfdxvkexI7+iLxXQbL540RQ/c4=","vue.min.js":"sha256-ngFW3UnAN0Tnm76mDuu7uUtYEcG3G5H1+zioJw3t+68=","vue.runtime.common.dev.js":"sha256-K1I+V5ATCKkhmeLuhXPLi6MJ6baIMq63AdKfLr1to5o=","vue.runtime.common.js":"sha256-iPf9+Ogi9Q0ERtzOtUPfBttEZT7SGb3l/9LAldqDJmQ=","vue.runtime.common.prod.js":"sha256-Tj24teFUOrMRvvqrKP0Td42X/kbj/SJfgjTenZuIjJ8=","vue.runtime.esm.js":"sha256-R/wILGaOjQG2P8U21mBPH0uRyRIfF4xXW49y0buxBmo=","vue.runtime.js":"sha256-ry9SZACrXbOKzkD0/qM/0Z+ELi24EcrhwFgKF2cTuUQ=","vue.runtime.min.js":"sha256-vT4XcKWLfaGor0IJgp3nAOzlVh3B29yLJ7paM+bYgao="}}</JSONExample>
        </div>
    </div>
</template>

<script>
    import JSONExample from '../json_example';

    export default {
        name: 'APIVersion',
        components: {
            JSONExample,
        },
        data () {
            return {
                query: [
                    {
                        param: 'fields',
                        type: 'comma-separated string',
                        req: false,
                        desc: [
                            'Provide a comma-separated string of fields to return in the library version object.',
                        ],
                    },
                    {
                        param: 'output',
                        type: 'string',
                        req: false,
                        desc: [
                            'Use the output value <code>human</code> to receive the JSON results in pretty print format, presented on a HTML page.',
                        ],
                    },
                ],
                response: [
                    {
                        prop: 'name',
                        type: [
                            'string',
                        ],
                        desc: [
                            'This will be the full name of the library, as stored on cdnjs.',
                        ],
                    },
                    {
                        prop: 'version',
                        type: [
                            'string',
                        ],
                        desc: [
                            'The version of the library that has been requested. This should match the version requested in the URL.',
                        ],
                    },
                    {
                        prop: 'files',
                        type: [
                            'array<string>',
                        ],
                        desc: [
                            'The files available for this version of the library on the cdnjs CDN.',
                            '<small><i>This array of files is filtered by our CDN whitelist, so all these files will be available for use on our CDN.</i></small>',
                        ],
                    },
                    {
                        prop: 'rawFiles',
                        type: [
                            'array<string>',
                        ],
                        desc: [
                            'All the files that cdnjs has for this version of the library, irrespective of if they will be available on the CDN.',
                            '<small><i>This array of files ignores the whitelist filter, which means some files may not be available on the CDN if their extensions aren\'t whitelisted.</i></small>',
                        ],
                    },
                    {
                        prop: 'sri',
                        type: [
                            'object',
                            'map<string, string>',
                        ],
                        desc: [
                            'This object will contain a key for each file that cdnjs could calculate an SRI hash for, with the value being the SRI hash.',
                        ],
                    },
                ],
            };
        },
    };
</script>
