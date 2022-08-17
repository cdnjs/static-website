<template>
    <div>
        <h2 id="library">
            Getting a specific library on cdnjs
        </h2>
        <div class="doc">
            <div class="callout">
                <ExclamationTriangle class="icon" />
                <div>
                    <p>
                        Accessing <code>assets</code> for all versions of a library using this endpoint is deprecated.
                        The <code>assets</code> property now only contains a single entry for the latest version.
                        To access the assets of any version, use the <code>/libraries/:library/:version</code> endpoint.
                    </p>
                    <p>
                        See
                        <a href="https://github.com/cdnjs/cdnjs/issues/14140" target="_blank">
                            cdnjs/cdnjs issue #14140</a>
                        for more information.
                    </p>
                </div>
            </div>

            <p>
                The <code>/libraries/:library</code> endpoint allows for data on a specific library to be
                requested and will return a JSON object with all library data properties by default.
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

            <h3>Example Requests</h3>

            <h4>
                <a href="https://api.cdnjs.com/libraries/vue?fields=name,author,description,filename,sri,version,repository,autoupdate">
                    <code class="key">https://api.cdnjs.com/libraries/vue?fields=name,author,description,filename,sri,version,repository,autoupdate</code>
                </a>
            </h4>
            <JSONExample>{"name":"vue","author":"Evan You &lt;yyx990803@gmail.com&gt;","description":"Simple, Fast & Composable MVVM for building interactive interfaces","filename":"vue.min.js","sri":null,"version":"3.2.37","repository":{"type":"git","url":"https://github.com/vuejs/vue.git"},"autoupdate":{"source":"npm","target":"vue","fileMap":[{"basePath":"dist","files":["**/*.+(js|map)"]}]}}</JSONExample>

            <h4>
                <a href="https://api.cdnjs.com/libraries/react?fields=name,description">
                    <code class="key">https://api.cdnjs.com/libraries/react?fields=name,description</code>
                </a>
            </h4>
            <JSONExample>{"name":"react","description":"React is a JavaScript library for building user interfaces."}</JSONExample>

            <h4>
                <a href="https://api.cdnjs.com/libraries/jquery?fields=assets,versions">
                    <code class="key">https://api.cdnjs.com/libraries/jquery?fields=assets,versions</code>
                </a>
            </h4>
            <JSONExample>{"assets":[{"version":"3.6.0","files":["jquery.js","jquery.min.js","jquery.min.map","jquery.slim.js","jquery.slim.min.js","jquery.slim.min.map"],"rawFiles":["jquery.js","jquery.min.js","jquery.min.map","jquery.slim.js","jquery.slim.min.js","jquery.slim.min.map"],"sri":{"jquery.js":"sha512-n/4gHW3atM3QqRcbCn6ewmpxcLAHGaDjpEBu4xZd47N0W2oQ+6q7oc3PXstrJYXcbNU1OHdQ1T7pAP+gi5Yu8g==","jquery.min.js":"sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==","jquery.slim.js":"sha512-HNbo1d4BaJjXh+/e6q4enTyezg5wiXvY3p/9Vzb20NIvkJghZxhzaXeffbdJuuZSxFhJP87ORPadwmU9aN3wSA==","jquery.slim.min.js":"sha512-6ORWJX/LrnSjBzwefdNUyLCMTIsGoNP6NftMy2UAm1JBm6PRZCO1d7OHBStWpVFZLO+RerTvqX/Z9mBFfCJZ4A=="}}],"versions":["1.10.0","1.10.1","1.10.2","1.11.0","1.11.0-beta3","1.11.0-rc1","1.11.1","1.11.1-beta1","1.11.1-rc1","1.11.1-rc2","1.11.2","1.11.3","1.12.0","1.12.1","1.12.2","1.12.3","1.12.4","1.2.3","1.2.6","1.3.0","1.3.1","1.3.2","1.4.0","1.4.1","1.4.2","1.4.3","1.4.4","1.5.1","1.6.1","1.6.2","1.6.3","1.6.4","1.7","1.7.1","1.7.2","1.8.0","1.8.1","1.8.2","1.8.3","1.9.0","1.9.1","2.0.0","2.0.1","2.0.2","2.0.3","2.1.0","2.1.0-beta2","2.1.0-beta3","2.1.0-rc1","2.1.1","2.1.1-beta1","2.1.1-rc1","2.1.1-rc2","2.1.2","2.1.3","2.1.4","2.2.0","2.2.1","2.2.2","2.2.3","2.2.4","3.0.0","3.0.0-alpha1","3.0.0-beta1","3.0.0-rc1","3.1.0","3.1.1","3.2.0","3.2.1","3.3.0","3.3.1","3.4.0","3.4.1","3.5.0","3.5.1","3.6.0"]}</JSONExample>
        </div>
    </div>
</template>

<script>
    import ExclamationTriangle from '@fortawesome/fontawesome-free/svgs/solid/exclamation-triangle.svg?inline';
    import JSONExample from '../json_example';

    export default {
        name: 'APILibrary',
        components: {
            ExclamationTriangle,
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
                            'Provide a comma-separated string of fields to return in the library object.',
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
                        prop: 'latest',
                        type: [
                            'string',
                        ],
                        desc: [
                            'This will be the URL of the default file on the latest version of the library.',
                            '<small><i>It is important to note that this URL is based on the latest version number of the library and the default file name configured, there is no validation in place to ensure that this URL will actually serve a valid asset.</i></small>',
                        ],
                    },
                    {
                        prop: 'sri',
                        type: [
                            'string',
                        ],
                        desc: [
                            'The SRI hash value for the file provided in the <code>latest</code> property, if it exists and is valid (i.e. if the SRI hash could be calculated for it).',
                        ],
                    },
                    {
                        prop: 'filename',
                        type: [
                            'string',
                        ],
                        desc: [
                            'This will be the name of the default file for the library. If not defined in the package\'s JSON file, this will be an empty string',
                            '<small><i>There is no validation that this file actually exists in each version of the library.</i></small>',
                        ],
                    },
                    {
                        prop: 'version',
                        type: [
                            'string',
                        ],
                        desc: [
                            'The latest version of the library that is available on cdnjs.',
                        ],
                    },
                    {
                        prop: 'description',
                        type: [
                            'string',
                        ],
                        desc: [
                            'The description of the library if it has been provided in the cdnjs package JSON file.',
                        ],
                    },
                    {
                        prop: 'homepage',
                        type: [
                            'optional',
                            'string',
                        ],
                        desc: [
                            'A link to the homepage of the package, if one is defined in the cdnjs package JSON file. Normally, this is either the package repository or the package website.',
                            'If the library has no defined homepage, this property will be omitted (unless requested via fields explicitly, then it will be null).',
                        ],
                    },
                    {
                        prop: 'keywords',
                        type: [
                            'nullable',
                            'array<string>',
                        ],
                        desc: [
                            'An array of keywords provided in the cdnjs package JSON for the library.',
                        ],
                    },
                    {
                        prop: 'repository',
                        type: [
                            'nullable',
                            'object',
                        ],
                        desc: [
                            'The repository for the library, if known, in standard repository format.',
                        ],
                    },
                    {
                        prop: 'repository.type',
                        type: [
                            'string',
                        ],
                        desc: [
                            'The type of repository for the library, normally <code>git</code>.',
                        ],
                    },
                    {
                        prop: 'repository.url',
                        type: [
                            'string',
                        ],
                        desc: [
                            'The url for repository associated with the library, if provided in the library\'s cdnjs package JSON file.',
                        ],
                    },
                    {
                        prop: 'license',
                        type: [
                            'optional',
                            'string',
                        ],
                        desc: [
                            'The license defined for the library on cdnjs, as a string. If the library has a custom license, it may not be shown here.',
                            'If the library has no defined licenses in its cdnjs package JSON file, this property may be omitted (if explicitly requested via fields, it will be null).',
                        ],
                    },
                    {
                        prop: 'author',
                        type: [
                            'nullable',
                            'string',
                        ],
                        desc: [
                            'The attributed author for the library, as defined in the cdnjs package JSON file for this library.',
                        ],
                    },
                    {
                        prop: 'autoupdate',
                        type: [
                            'optional',
                            'object',
                        ],
                        desc: [
                            'The auto-update configuration for the library, from the library\'s package JSON file on cdnjs.',
                            'If the library has no auto-update configuration, this property will not be present (unless explicitly requested with fields, then it will be null).',
                        ],
                    },
                    {
                        prop: 'autoupdate.type',
                        type: [
                            'optional',
                            'string',
                        ],
                        desc: [
                            'The source type of auto-update begin used for the library, either <code>git</code> or <code>npm</code>.',
                            'This may be replaced with the <code>source</code> property in some responses.',
                        ],
                    },
                    {
                        prop: 'autoupdate.source',
                        type: [
                            'optional',
                            'string',
                        ],
                        desc: [
                            'This property is the same as <code>type</code> but may be present in some responses instead of <code>type</code>.',
                        ],
                    },
                    {
                        prop: 'autoupdate.target',
                        type: [
                            'string',
                        ],
                        desc: [
                            'The target for the auto-update configuration. If <code>git</code>, this should be a valid git URL, if <code>npm</code> this will be a package name from the NPM package repository.',
                        ],
                    },
                    {
                        prop: 'versions',
                        type: [
                            'array<string>',
                        ],
                        desc: [
                            'An array containing all the versions of the library available on cdnjs.',
                            '<small><i>These may not be valid semver.</i></small>',
                        ],
                    },
                    {
                        prop: 'assets',
                        type: [
                            'array<object>',
                        ],
                        desc: [
                            'An array containing an object for the latest version of the library on cdnjs. The array is empty if the library has no known versions.',
                            '<small><i>Older versions of the library are no longer included in this array. See deprecation notice.</i></small>',
                        ],
                    },
                    {
                        prop: 'assets[].version',
                        type: [
                            'string',
                        ],
                        desc: [
                            'The version identifier for this version of the library on cdnjs.',
                            '<small><i>This may not be valid semver.</i></small>',
                        ],
                    },
                    {
                        prop: 'assets[].files',
                        type: [
                            'array<string>',
                        ],
                        desc: [
                            'The files available for this version of the library on the cdnjs CDN.',
                            '<small><i>This array of files is filtered by our CDN whitelist, so all these files will be available for use on our CDN.</i></small>',
                        ],
                    },
                    {
                        prop: 'assets[].rawFiles',
                        type: [
                            'array<string>',
                        ],
                        desc: [
                            'All the files that cdnjs has for this version of the library, irrespective of if they will be available on the CDN.',
                            '<small><i>This array of files ignores the whitelist filter, which means some files may not be available on the CDN if their extensions aren\'t whitelisted.</i></small>',
                        ],
                    },
                    {
                        prop: 'assets[].sri',
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
