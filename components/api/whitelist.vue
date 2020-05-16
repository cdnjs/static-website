<template>
    <div>
        <h2 id="whitelist">
            Fetch details about the cdnjs file extension whitelist
        </h2>
        <div class="doc">
            <p>
                The <code>/whitelist</code> endpoint returns a JSON object containing a list of extensions permitted on
                the CDN as well as categories for those extensions.
            </p>
            <p>
                The cache lifetime on this endpoint is 6 hours.
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
                <a href="https://api.cdnjs.com/whitelist">
                    <code class="key">https://api.cdnjs.com/whitelist</code>
                </a>
            </h4>
            <JSONExample>{"extensions":["js","ts","wasm","map","swf","json","css","scss","png","gif","jpg","jpeg","svg","webp","cur","ttf","eot","woff","woff2","otf","aac","mp3","ogg","lang","hpb"],"categories":{"js":"JavaScript","ts":"TypeScript","wasm":"WebAssembly","map":"Source Maps","swf":"Flash","json":"JSON","css":"Styling","scss":"Styling","png":"Images","gif":"Images","jpg":"Images","jpeg":"Images","svg":"Images","webp":"Images","cur":"Images","ttf":"Fonts","eot":"Fonts","woff":"Fonts","woff2":"Fonts","otf":"Fonts","aac":"Audio","mp3":"Audio","ogg":"Audio","lang":"Other","hpb":"Other"}}</JSONExample>
        </div>
    </div>
</template>

<script>
    import JSONExample from '../json_example';

    export default {
        name: 'APIWhitelist',
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
                            'Provide a comma-separated string of fields to return from the available whitelist data.',
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
                        prop: 'extensions',
                        type: [
                            'array<string>',
                        ],
                        desc: [
                            'The full list of file extensions that are whitelisted on the CDN, allowing files with these extensions to be available.',
                        ],
                    },
                    {
                        prop: 'categories',
                        type: [
                            'object',
                            'map<string, string>',
                        ],
                        desc: [
                            'An object that maps each whitelisted extension to a category, used for sorting files on the cdnjs website.',
                        ],
                    },
                ],
            };
        },
    };
</script>
