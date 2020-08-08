<template>
    <div>
        <h2 id="stats">
            Fetch basic statistics for cdnjs
        </h2>
        <div class="doc">
            <p>
                The <code>/stats</code> endpoint returns a JSON object containing a set of statistics relating to cdnjs.
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
                <a href="https://api.cdnjs.com/stats">
                    <code class="key">https://api.cdnjs.com/stats</code>
                </a>
            </h4>
            <JSONExample>{"libraries":3909}</JSONExample>
        </div>
    </div>
</template>

<script>
    import JSONExample from '../json_example';

    export default {
        name: 'APIStats',
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
                        prop: 'libraries',
                        type: [
                            'integer',
                        ],
                        desc: [
                            'The total number of libraries available on cdnjs and on the API.',
                        ],
                    },
                ],
            };
        },
    };
</script>
