<template>
    <div>
        <h2 id="browse">
            Browsing all libraries on cdnjs
        </h2>
        <div class="doc">
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

            <p>
                This endpoint is directly powered by our Algolia index, the same one that is used on this
                website for the search box at the top and on the
                <router-link :to="{ name: 'libraries' }">
                    Libraries page
                </router-link>.
            </p>

            <h3>Example Requests</h3>

            <h4>
                <a href="https://api.cdnjs.com/libraries">
                    <code class="key">https://api.cdnjs.com/libraries</code>
                </a>
            </h4>
            <JSONExample>{"results":[{"name":"vue","latest":"https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js"},{"name":"react","latest":"https://cdnjs.cloudflare.com/ajax/libs/react/16.13.1/umd/react.production.min.js"},{"name":"react-dom","latest":"https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.13.1/umd/react-dom.production.min.js"},{"name":"react-is","latest":"https://cdnjs.cloudflare.com/ajax/libs/react-is/16.13.1/umd/react-is.production.min.js"},{"name":"twitter-bootstrap","latest":"https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.0/js/bootstrap.min.js"},{"name":"d3","latest":"https://cdnjs.cloudflare.com/ajax/libs/d3/5.16.0/d3.min.js"},{"name":"axios","latest":"https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"},{"name":"animate.css","latest":"https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css"},{"name":"font-awesome","latest":"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"}, "..."],"total":3606,"available":3606}</JSONExample>
            <p>
                <small>
                    <i>Example response has been trimmed to remove items in the results array.</i>
                </small>
            </p>

            <h4>
                <a href="https://api.cdnjs.com/libraries?search=jquery">
                    <code class="key">https://api.cdnjs.com/libraries?search=jquery</code>
                </a>
            </h4>
            <JSONExample>{"results":[{"name":"jquery","latest":"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"},{"name":"jquery-compat","latest":"https://cdnjs.cloudflare.com/ajax/libs/jquery-compat/3.0.0-alpha1/jquery.min.js"},{"name":"blueimp-file-upload","latest":"https://cdnjs.cloudflare.com/ajax/libs/blueimp-file-upload/10.23.0/js/jquery.fileupload.min.js"},{"name":"fullPage.js","latest":"https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/3.0.8/fullpage.min.css"},{"name":"select2","latest":"https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.12/js/select2.min.js"},{"name":"chosen","latest":"https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.jquery.min.js"},{"name":"cheerio","latest":"https://cdnjs.cloudflare.com/ajax/libs/cheerio/1.0.0-rc.3/index.js"},{"name":"Sortable","latest":"https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.10.1/Sortable.min.js"}, "..."],"total":865,"available":865}</JSONExample>
            <p>
                <small>
                    <i>Example response has been trimmed to remove items in the results array.</i>
                </small>
            </p>

            <h4>
                <a href="https://api.cdnjs.com/libraries?search=vue&fields=filename,description,version,github">
                    <code class="key">https://api.cdnjs.com/libraries?search=vue&fields=filename,description,version,github&limit=3</code>
                </a>
            </h4>
            <JSONExample>{"results":[{"name":"vue","latest":"https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js","filename":"vue.min.js","description":"Simple, Fast & Composable MVVM for building interactive interfaces","version":"2.6.11","github":{"user":"vuejs","repo":"vue","stargazers_count":163564,"forks":24743,"subscribers_count":6145}},{"name":"element-ui","latest":"https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.13.1/index.js","filename":"index.js","description":"A Component Library for Vue.js.","version":"2.13.1","github":{"user":"ElemeFE","repo":"element","stargazers_count":45141,"forks":10399,"subscribers_count":1378}},{"name":"vuetify","latest":"https://cdnjs.cloudflare.com/ajax/libs/vuetify/2.3.0-beta.4/vuetify.min.js","filename":"vuetify.min.js","description":"Vue.js 2 Semantic Component Framework","version":"2.3.0-beta.4","github":{"user":"vuetifyjs","repo":"vuetify","stargazers_count":25230,"forks":4186,"subscribers_count":575}}],"total":3,"available":53}</JSONExample>
        </div>
    </div>
</template>

<script>
    import JSONExample from '../json_example';

    export default {
        name: 'APIBrowse',
        components: {
            JSONExample,
        },
        data () {
            return {
                query: [
                    {
                        param: 'search',
                        type: 'string',
                        req: false,
                        desc: [
                            'The value to use when searching the libraries index on cdnjs.',
                            'Libraries will not be ranked by search relevance when they are returned, they will be ranked using the same ranking as when no search query is provided.',
                            '<small><i>This ranking is done by Algolia and is primarily based on the number of stars each library\'s associated GitHub repo has.</i></small>',
                        ],
                    },
                    {
                        param: 'fields',
                        type: 'comma-separated string',
                        req: false,
                        desc: [
                            'Provide a comma-separated string of fields to return in each library object from the cdnjs Algolia index.',
                            '<code>name</code> and <code>latest</code> will always be present in every object. Any field requested that does not exist will be included in each object with a <code>null</code> value.',
                            'Currently, the following fields (case-sensitive) are published in the Algolia index for each library and can be requested via this parameter: <code>filename</code>, <code>description</code>, <code>version</code>, <code>keywords</code>, <code>alternativeNames</code>, <code>fileType</code>, <code>github</code>, <code>objectID</code>, <code>license</code>, <code>homepage</code>, <code>repository</code>, <code>author</code>, <code>originalName</code>, <code>sri</code>.',
                            '<small><i>The available fields are based on the <a href="https://github.com/cdnjs/tools/blob/master/cmd/algolia/main.go">SearchEntry structure in our tools repo</a>.</i></small>',
                        ],
                    },
                    {
                        param: 'search_fields',
                        type: 'comma-separated string',
                        req: false,
                        desc: [
                            'Provide a comma-separated string of fields to be considered when searching for a given <code>search</code> query parameter.',
                            'Not all fields are supported for this, any unsupported fields given will be silently ignored. Currently, the following fields (case-sensitive) are supported: <code>name</code>, <code>alternativeNames</code>, <code>github.​repo</code>, <code>description</code>, <code>keywords</code>, <code>filename</code>, <code>repositories.​url</code>, <code>github.​user</code>, <code>maintainers.​name</code>.',
                            '<small><i>The supported fields are controlled by our Algolia settings and are mirrored in the <a href="https://github.com/cdnjs/api-server/blob/master/routes/libraries.js">API server libraries route logic</a>.</i></small>',
                        ],
                    },
                    {
                        param: 'limit',
                        type: 'integer',
                        req: false,
                        desc: [
                            'Limit the number of library objects that are returned in the results array.',
                            'This value will be reflected in the <code>total</code> top-level property, but the <code>available</code> property will return the full number with no limit applied.',
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
                        prop: 'results',
                        type: [
                            'array<object>',
                        ],
                        desc: [
                            'This property will contain an object for every library that cdnjs has available.',
                        ],
                    },
                    {
                        prop: 'results[].name',
                        type: [
                            'string',
                        ],
                        desc: [
                            'This will be the full name of the library, as stored on cdnjs.',
                        ],
                    },
                    {
                        prop: 'results[].latest',
                        type: [
                            'string',
                        ],
                        desc: [
                            'This will be the URL of the default file on the latest version of the library.',
                            '<small><i>It is important to note that this URL is based on the latest version number of the library and the default file name configured, there is no validation in place to ensure that this URL will actually serve a valid asset.</i></small>',
                        ],
                    },
                    {
                        prop: 'results[].filename',
                        type: [
                            'optional',
                            'string',
                        ],
                        desc: [
                            'The will be the name of the default file for the library.',
                            '<small><i>There is no validation that this file actually exists in each version of the library.</i></small>',
                        ],
                    },
                    {
                        prop: 'results[].description',
                        type: [
                            'optional',
                            'string',
                        ],
                        desc: [
                            'The description of the library if it has been provided in the cdnjs package JSON file.',
                        ],
                    },
                    {
                        prop: 'results[].version',
                        type: [
                            'optional',
                            'string',
                        ],
                        desc: [
                            'The latest version of the library that is available on cdnjs.',
                        ],
                    },
                    {
                        prop: 'results[].keywords',
                        type: [
                            'optional',
                            'nullable',
                            'array<string>',
                        ],
                        desc: [
                            'An array of keywords provided in the cdnjs package JSON for the library.',
                        ],
                    },
                    {
                        prop: 'results[].alternativeNames',
                        type: [
                            'optional',
                            'array<string>',
                        ],
                        desc: [
                            'An array of other names that might be used for the library. These cannot be substituted for the actual library name when navigating the cdnjs API and website.',
                        ],
                    },
                    {
                        prop: 'results[].fileType',
                        type: [
                            'optional',
                            'string',
                        ],
                        desc: [
                            'The file type (extension) for the default file defined for the library in the cdnjs package JSON.',
                        ],
                    },
                    {
                        prop: 'results[].github',
                        type: [
                            'optional',
                            'nullable',
                            'object',
                        ],
                        desc: [
                            'Some meta data from the relevant GitHub repository for the library, if available and configured in the cdnjs package JSON for the library.',
                        ],
                    },
                    {
                        prop: 'results[].github.user',
                        type: [
                            'optional',
                            'string',
                        ],
                        desc: [
                            'The username or organisation name for the repository on GitHub.',
                        ],
                    },
                    {
                        prop: 'results[].github.repo',
                        type: [
                            'optional',
                            'string',
                        ],
                        desc: [
                            'The name of the repository on GitHub.',
                            '<small><i>The full repository name can be constructed in the form <code>user/repo</code>.</i></small>',
                        ],
                    },
                    {
                        prop: 'results[].github.stargazers_count',
                        type: [
                            'optional',
                            'integer',
                        ],
                        desc: [
                            'The number of stars that the repository has on GitHub.',
                        ],
                    },
                    {
                        prop: 'results[].github.forks',
                        type: [
                            'optional',
                            'integer',
                        ],
                        desc: [
                            'The number of forks the repository currently has (at time of indexing) on GitHub.',
                        ],
                    },
                    {
                        prop: 'results[].github.subscribers_count',
                        type: [
                            'optional',
                            'integer',
                        ],
                        desc: [
                            'The number of users on GitHub who are watching the repository.',
                        ],
                    },
                    {
                        prop: 'results[].objectID',
                        type: [
                            'optional',
                            'string',
                        ],
                        desc: [
                            'The ID used internally within Algolia to track this entry, this will be the name of the library as seen on cdnjs.',
                        ],
                    },
                    {
                        prop: 'results[].license',
                        type: [
                            'optional',
                            'string',
                        ],
                        desc: [
                            'The license defined for the library on cdnjs, as a string. If the library has a custom license, it may not be shown here.',
                        ],
                    },
                    {
                        prop: 'results[].homepage',
                        type: [
                            'optional',
                            'string',
                        ],
                        desc: [
                            'A link to the homepage of the package, if one is defined in the cdnjs package JSON file. Normally, this is either the package repository or the package website.',
                        ],
                    },
                    {
                        prop: 'results[].repository',
                        type: [
                            'optional',
                            'nullable',
                            'object',
                        ],
                        desc: [
                            'The repository for the library, if known, in standard repository format.',
                        ],
                    },
                    {
                        prop: 'results[].repository.type',
                        type: [
                            'optional',
                            'string',
                        ],
                        desc: [
                            'The type of repository for the library, normally <code>git</code>.',
                        ],
                    },
                    {
                        prop: 'results[].repository.url',
                        type: [
                            'optional',
                            'string',
                        ],
                        desc: [
                            'The url for repository associated with the library, if provided in the library\'s cdnjs package JSON file.',
                        ],
                    },
                    {
                        prop: 'results[].author',
                        type: [
                            'optional',
                            'string',
                        ],
                        desc: [
                            'The attributed author for the library, as defined in the cdnjs package JSON file for this library.',
                        ],
                    },
                    {
                        prop: 'results[].originalName',
                        type: [
                            'optional',
                            'string',
                        ],
                        desc: [
                            'If the library on cdnjs was every renamed, this value will contain the original name for this library. If it hasn\'t been renamed, this value will match the current name.',
                        ],
                    },
                    {
                        prop: 'results[].sri',
                        type: [
                            'optional',
                            'string',
                        ],
                        desc: [
                            'The SRI hash value for the file provided in the <code>latest</code> property, if it exists and is valid (i.e. if the SRI hash could be calculated for it).',
                        ],
                    },
                    {
                        prop: 'total',
                        type: [
                            'integer',
                        ],
                        desc: [
                            'The total number of libraries returned in the request.',
                        ],
                    },
                    {
                        prop: 'available',
                        type: [
                            'integer',
                        ],
                        desc: [
                            'If a limit query parameter is given, this will be the total number of libraries available if no limit is given. If no limit parameter is given, this will match the <code>total</code> property.',
                        ],
                    },
                ],
            };
        },
    };
</script>
