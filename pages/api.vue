<template>
    <section>
        <header>
            <Breadcrumbs :crumbs="crumbs"></Breadcrumbs>
            <div class="content">
                <h1>
                    cdnjs provides a simple API to allow anyone to quickly query the libraries we have on the CDN.
                </h1>
                <p>
                    We provide two main endpoints, the <code>libraries</code> endpoint which allows anyone to search
                    through the full set of libraries we offer, and the <code>libraries/:library</code> endpoint which
                    allows for detailed data to be ascertained for a specific library.
                </p>
                <ul>
                    <li><small>Endpoints</small></li>
                    <li>
                        <a href="#browse">Browsing all libraries on cdnjs</a>
                    </li>
                    <li>
                        <a href="#library">Getting a specific library on cdnjs</a>
                    </li>
                </ul>
            </div>
        </header>
        <div class="content">
            <h2 id="browse">
                Browsing all libraries on cdnjs
            </h2>
            <div class="doc">
                <p>
                    The <code>libraries</code> endpoint will return a JSON object with two top-level properties.
                </p>
                <p>
                    This API endpoint can also be used to search cdnjs for libraries, by making use of the
                    optional <code>search</code> URL query parameter.
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
                        <tr v-for="field in api.browse.query">
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
                        <tr v-for="field in api.browse.response">
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
                <JSONExample>{"results":[{"name":"vue","latest":"https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js"},{"name":"react","latest":"https://cdnjs.cloudflare.com/ajax/libs/react/16.13.0/umd/react.production.min.js"},{"name":"react-dom","latest":"https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.13.0/umd/react-dom.production.min.js"},{"name":"twitter-bootstrap","latest":"https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/js/bootstrap.min.js"},{"name":"d3","latest":"https://cdnjs.cloudflare.com/ajax/libs/d3/5.15.0/d3.min.js"},{"name":"axios","latest":"https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"},{"name":"animate.css","latest":"https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"},{"name":"font-awesome","latest":"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"}, "..."],"total":3451}</JSONExample>
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
                <JSONExample>{"results":[{"name":"jquery","latest":"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"},{"name":"jquery-compat","latest":"https://cdnjs.cloudflare.com/ajax/libs/jquery-compat/3.0.0-alpha1/jquery.min.js"},{"name":"blueimp-file-upload","latest":"https://cdnjs.cloudflare.com/ajax/libs/blueimp-file-upload/10.8.0/js/jquery.fileupload.min.js"},{"name":"fullPage.js","latest":"https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/3.0.8/fullpage.min.css"},{"name":"select2","latest":"https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.12/js/select2.min.js"},{"name":"chosen","latest":"https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.jquery.min.js"},{"name":"Sortable","latest":"https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.10.1/Sortable.min.js"},{"name":"popmotion","latest":"https://cdnjs.cloudflare.com/ajax/libs/popmotion/8.7.1/popmotion.global.min.js"}, "..."],"total":846}</JSONExample>
                <p>
                    <small>
                        <i>Example response has been trimmed to remove items in the results array.</i>
                    </small>
                </p>

                <h4>
                    <a href="https://api.cdnjs.com/libraries?search=vue&fields=filename,description,version,github">
                        <code class="key">https://api.cdnjs.com/libraries?search=vue&fields=filename,description,version,github</code>
                    </a>
                </h4>
                <JSONExample>{"results":[{"name":"vue","latest":"https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js","filename":"vue.min.js","description":"Simple, Fast & Composable MVVM for building interactive interfaces","version":"2.6.11","github":{"user":"vuejs","repo":"vue","stargazers_count":159549,"forks":24084,"subscribers_count":6057}},{"name":"element-ui","latest":"https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.13.0/index.js","filename":"index.js","description":"A Component Library for Vue.js.","version":"2.13.0","github":{"user":"ElemeFE","repo":"element","stargazers_count":44222,"forks":10050,"subscribers_count":1365}},{"name":"vuetify","latest":"https://cdnjs.cloudflare.com/ajax/libs/vuetify/2.2.18/vuetify.min.js","filename":"vuetify.min.js","description":"Vue.js 2 Semantic Component Framework","version":"2.2.18","github":{"user":"vuetifyjs","repo":"vuetify","stargazers_count":24289,"forks":3848,"subscribers_count":569}}, "..."],"total":46}</JSONExample>
                <p>
                    <small>
                        <i>Example response has been trimmed to remove items in the results array.</i>
                    </small>
                </p>
            </div>

            <h2 id="library">
                Getting a specific library on cdnjs
            </h2>
            <div class="doc">
                <p>
                    The <code>libraries/:library</code> endpoint allows for data on a specific library to be
                    requested and will return a JSON object with all library data properties by default.
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
                        <tr v-for="field in api.library.query">
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
                        <tr v-for="field in api.library.response">
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
            </div>
        </div>
    </section>
</template>

<script>
    import Breadcrumbs from '../components/breadcrumbs';
    import JSONExample from '../components/json_example';
    import breadcrumbs from '../util/breadcrumbs';
    import setMeta from '../util/set_meta';
    import api from '../data/api';

    const meta = {
        title: 'API Documentation',
        breadcrumb: 'API Documentation',
        desc: 'The cdnjs API allows for easy programmatic navigation of our libraries and tutorials. Read the docs to learn about all the endpoints we offer.',
        classes: [],
    };

    export default {
        name: 'API',
        meta,
        head () {
            return setMeta(meta, this);
        },
        components: {
            Breadcrumbs,
            JSONExample,
        },
        data () {
            return {
                api,
            };
        },
        async asyncData (data) {
            return {
                crumbs: await breadcrumbs(data.route, data.app.router, {}),
            };
        },
    };
</script>
