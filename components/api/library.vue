<template>
    <div>
        <h2 id="library">
            Getting a specific library on cdnjs
        </h2>
        <div class="doc">
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
            <JSONExample>{"name":"vue","author":"Evan You &lt;yyx990803@gmail.com&gt;","description":"Simple, Fast & Composable MVVM for building interactive interfaces","filename":"vue.min.js","sri":"sha256-ngFW3UnAN0Tnm76mDuu7uUtYEcG3G5H1+zioJw3t+68=","version":"2.6.11","repository":{"type":"git","url":"https://github.com/vuejs/vue.git"},"autoupdate":{"source":"npm","target":"vue"}}</JSONExample>

            <h4>
                <a href="https://api.cdnjs.com/libraries/react?fields=name,description,tutorials">
                    <code class="key">https://api.cdnjs.com/libraries/react?fields=name,description,tutorials</code>
                </a>
            </h4>
            <JSONExample>{"name":"react","description":"React is a JavaScript library for building user interfaces.","tutorials":[{"id":"universal-react-apps","modified":"2017-09-05T17:31:26.000Z","author":{"name":"Ahmed Bouchefra","email":"techiediaries9@gmail.com","description":"Web developer, technical writer and entrepreneur","homepage":"https://www.techiediaries.com","twitter":"techiediaries"},"description":"This tutorial will cover how to use React and Next.js to build a simple universal web app.","homepage":"https://www.techiediaries.com","keywords":["react","nextjs","universal"],"library-tags":["react","nextjs"],"name":"Building Universal Server Rendered Apps with React and Next.js 3.0","repository":"https://github.com/techiediaries","content":"\n## Introduction\n\nNext.js is a framework for quickly building universal (also called Isomorphic) server-rendered web apps with\nReact. In this tutorial you will learn essential concepts of server-rendered React apps by creating a demo app with Next.js.\n\nBuilding apps with Next.js is simple. You just create a &lt;em&gt;pages&lt;/em&gt; directory and place React components in it.\nNext.js will take care of everything else.\n\nThis tutorial was originally published in [techiediaries](https://www.techiediaries.com/universal-react-apps-nextjs/)\n\nNow let's get started\n\nFirst we need to install the required tools:\n\n## Installing Next.js 2.0\n\nYou can install Next.js 2.0 via npm with:\n\n    npm install --save next react react-dom\n\n## Installing Next.js 3.0\n\nNext.js 3.0 is still in beta, you can also install it via npm with:\n\n    npm install next@beta react react-dom --save\n\n## Adding NPM Scripts to package.json\n\nBuilding apps with Next.js is a matter of using three commands:\n\n    next\n    next build\n    next start\n\nSo lets add NPM scripts to trigger these commands:\n\n  \"scripts\": {\n    \"dev\": \"next\",\n    \"build\": \"next build\",\n    \"start\": \"next start\"\n  },\n\n## Adding Pages\n\nTo create pages you first need to create a pages directory:\n\n    mkdir pages\n\n### Adding the Home Page\n\nCreate an index.js file inside pages folder and put this content in it:\n\n    import Link from 'next/link'\n    export default () =&gt; (\n    &lt;div&gt;\n                &lt;Link href='/'&gt;&lt;a&gt;Home&lt;/a&gt;&lt;/Link&gt; -\n                &lt;Link href='/about'&gt;&lt;a&gt;About Me&lt;/a&gt;&lt;/Link&gt; -\n                &lt;Link href='/contact'&gt;&lt;a&gt;Contact&lt;/a&gt;&lt;/Link&gt;\n                &lt;br&gt;&lt;/br&gt;\n                &lt;p&gt;This is the home page&lt;/p&gt;\n\n    &lt;/div&gt;\n    )\n\n### Adding the About Page\n\nNext create an about.js file inside pages folder then put the following content:\n\n    import Link from 'next/link'\n    export default () =&gt; (\n    &lt;div&gt;\n                &lt;Link href='/'&gt;&lt;a&gt;Home&lt;/a&gt;&lt;/Link&gt; -\n                &lt;Link href='/about'&gt;&lt;a&gt;About Me&lt;/a&gt;&lt;/Link&gt; -\n                &lt;Link href='/contact'&gt;&lt;a&gt;Contact&lt;/a&gt;&lt;/Link&gt;\n                &lt;br&gt;&lt;/br&gt;\n                &lt;p&gt;This is about page&lt;/p&gt;\n    &lt;/div&gt;\n    )\n\n### Adding the Contact Page\n\nAdd contact.js file inside pages folder then put the following:\n\n    import Link from 'next/link'\n    export default () =&gt; (\n    &lt;div&gt;\n                &lt;Link href='/'&gt;&lt;a&gt;Home&lt;/a&gt;&lt;/Link&gt; -\n                &lt;Link href='/about'&gt;&lt;a&gt;About Me&lt;/a&gt;&lt;/Link&gt; -\n                &lt;Link href='/contact'&gt;&lt;a&gt;Contact&lt;/a&gt;&lt;/Link&gt;\n                &lt;br&gt;&lt;/br&gt;\n                &lt;p&gt;This is the contact page&lt;/p&gt;\n\n    &lt;/div&gt;\n    )\n\nNow you can launch next with:\n\n    npm run dev\n\nYour app will be available from [http://localhost:3000](http://localhost:3000).\n\nAs you can see the names of files inside pages directory become the routes except for / which points to index.js\n\n## Conclusion\n\nUniversal apps become very popular in these days and thanks to React and Next.js you can build them in a matter\nof a few commands.\n\nThanks for reading!\n"}]}</JSONExample>

            <h4>
                <a href="https://api.cdnjs.com/libraries/jquery?fields=assets,versions">
                    <code class="key">https://api.cdnjs.com/libraries/jquery?fields=assets,versions</code>
                </a>
            </h4>
            <JSONExample>{"assets":[{"version":"3.5.1","files":["jquery.js","jquery.min.js","jquery.min.map","jquery.slim.js","jquery.slim.min.js","jquery.slim.min.map"],"rawFiles":["jquery.js","jquery.min.js","jquery.min.map","jquery.slim.js","jquery.slim.min.js","jquery.slim.min.map"],"sri":{"jquery.js":"sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=","jquery.min.js":"sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=","jquery.slim.js":"sha256-DrT5NfxfbHvMHux31Lkhxg42LY6of8TaYyK50jnxRnM=","jquery.slim.min.js":"sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs="}},{"version":"3.5.0","files":["jquery.js","jquery.min.js","jquery.min.map","jquery.slim.js","jquery.slim.min.js","jquery.slim.min.map"],"rawFiles":["jquery.js","jquery.min.js","jquery.min.map","jquery.slim.js","jquery.slim.min.js","jquery.slim.min.map"],"sri":{"jquery.js":"sha256-r/AaFHrszJtwpe+tHyNi/XCfMxYpbsRg2Uqn0x3s2zc=","jquery.min.js":"sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ=","jquery.slim.js":"sha256-sCexhaKpAfuqulKjtSY7V9H7QT0TCN90H+Y5NlmqOUE=","jquery.slim.min.js":"sha256-MlusDLJIP1GRgLrOflUQtshyP0TwT/RHXsI1wWGnQhs="}}, "..."],"versions":["3.5.1","3.5.0","3.4.1","3.4.0","3.3.1","3.3.0","3.2.1","3.2.0","3.1.1","3.1.0","3.0.0","3.0.0-rc1","3.0.0-beta1","3.0.0-alpha1","2.2.4","2.2.3","2.2.2","2.2.1","2.2.0","2.1.4","2.1.3","2.1.2","2.1.1","2.1.1-rc2","2.1.1-rc1","2.1.1-beta1","2.1.0","2.1.0-rc1","2.1.0-beta3","2.1.0-beta2","2.0.3","2.0.2","2.0.1","2.0.0","1.12.4","1.12.3","1.12.2","1.12.1","1.12.0","1.11.3","1.11.2","1.11.1","1.11.1-rc2","1.11.1-rc1","1.11.1-beta1","1.11.0","1.11.0-rc1","1.11.0-beta3","1.10.2","1.10.1","1.10.0","1.9.1","1.9.0","1.8.3","1.8.2","1.8.1","1.8.0","1.7.2","1.7.1","1.6.4","1.6.3","1.6.2","1.6.1","1.5.1","1.4.4","1.4.3","1.4.2","1.4.1","1.4.0","1.3.2","1.3.1","1.3.0","1.2.6","1.2.3","1.7"]}</JSONExample>
            <p>
                <small>
                    <i>Example response has been trimmed to remove items in the assets array.</i>
                </small>
            </p>
        </div>
    </div>
</template>

<script>
    import JSONExample from '../json_example';

    export default {
        name: 'APILibrary',
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
                        prop: 'assets',
                        type: [
                            'array<object>',
                        ],
                        desc: [
                            'An array containing an object for each version of the library that cdnjs has available.',
                        ],
                    },
                    {
                        prop: 'assets[].version',
                        type: [
                            'string',
                        ],
                        desc: [
                            'The version identifier for this version of the library on cdnjs.',
                            '<small><i>This may, or may not, be valid semver.</i></small>',
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
                    {
                        prop: 'versions',
                        type: [
                            'array<string>',
                        ],
                        desc: [
                            'An array containing all the versions from <code>assets</code> without the files.',
                        ],
                    },
                    {
                        prop: 'tutorials',
                        type: [
                            'array<object>',
                        ],
                        desc: [
                            'An array that houses all tutorials that cdnjs has for this library, from the cdnjs/tutorials GitHub repository.',
                            '<small><i>Alongside the properties listed here, there may be other optional properties available based on the metadata available in each source tutorial file.</i></small>',
                        ],
                    },
                    {
                        prop: 'tutorials[].id',
                        type: [
                            'string',
                        ],
                        desc: [
                            'The slug/identifier for the tutorial, based on the filename of the tutorial in cdnjs/tutorials.',
                            '<small><i>This is the id that should be used when accessing the <code>/libraries/:library/tutorials/:tutorial</code> API endpoint.</i></small>',
                        ],
                    },
                    {
                        prop: 'tutorials[].modified',
                        type: [
                            'string',
                        ],
                        desc: [
                            'The timestamp of when the tutorial was last modified, in ISO 8601 format.',
                            'This is based on the last commit that touched the tutorial in cdnjs/tutorials.',
                        ],
                    },
                    {
                        prop: 'tutorials[].name',
                        type: [
                            'string',
                        ],
                        desc: [
                            'The title/name for the tutorial.',
                        ],
                    },
                    {
                        prop: 'tutorials[].content',
                        type: [
                            'string',
                        ],
                        desc: [
                            'The raw markdown content for the tutorial.',
                        ],
                    },
                ],
            };
        },
    };
</script>
