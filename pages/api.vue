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
                <div class="left">
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
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code class="key">search</code></td>
                                <td>
                                    <code class="key">optional</code> <code class="key">string</code>
                                    <p>
                                        The value to use when searching the libraries index on cdnjs.
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td><code class="key">fields</code></td>
                                <td>
                                    <code class="key">optional</code> <code class="key">comma-separated string</code>
                                    <p>
                                        Provide a comma-separated string of fields to return in each library object
                                        from the cdnjs Algolia index.
                                    </p>
                                    <p>
                                        <code>name</code> and <code>latest</code> will always be present in every
                                        object. Any field requested that does not exist will be included in each
                                        object with a <code>null</code> value.
                                    </p>
                                    <p>
                                        Currently, the following fields (case-sensitive) are published in the Algolia
                                        index for each library and can be requested via this parameter:
                                        <code>filename</code>, <code>description</code>, <code>version</code>,
                                        <code>keywords</code>, <code>alternativeNames</code>, <code>fileType</code>,
                                        <code>github</code>, <code>objectID</code>, <code>license</code>,
                                        <code>homepage</code>, <code>repository</code>, <code>author</code>,
                                        <code>originalName</code>, <code>sri</code>.
                                    </p>
                                    <p>
                                        <small>
                                            <i>
                                                The available fields are based on the
                                                <a href="https://github.com/cdnjs/tools/blob/master/cmd/algolia/main.go">
                                                    SearchEntry structure in our tools repo</a>.
                                            </i>
                                        </small>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td><code class="key">output</code></td>
                                <td>
                                    <code class="key">optional</code> <code class="key">string</code>
                                    <p>
                                        Use the output value <code>human</code> to receive the JSON results in pretty
                                        print format, presented on a HTML page.
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>JSON Response</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Property</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code class="key">results</code></td>
                                <td>
                                    <code class="key">array&lt;object&gt;</code>
                                    <p>
                                        This property will contain an object for every library that cdnjs has available.
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td><code class="key">results[].name</code></td>
                                <td>
                                    <code class="key">string</code>
                                    <p>
                                        This will be the full name of the library, as stored on cdnjs.
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td><code class="key">results[].latest</code></td>
                                <td>
                                    <code class="key">string</code>
                                    <p>
                                        This will be the URL of the default file on the latest version of the library.
                                    </p>
                                    <p>
                                        <small>
                                            <i>
                                                It is important to note that this URL is based on the latest version
                                                number of the library and the default file name configured, there is
                                                no validation in place to ensure that this URL will actually serve a
                                                valid asset.
                                            </i>
                                        </small>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td><code class="key">results[].filename</code></td>
                                <td>
                                    <code class="key">optional</code> <code class="key">string</code>
                                    <p>
                                        The will be the name of the default file for the library.
                                    </p>
                                    <p>
                                        <small>
                                            <i>
                                                There is no validation that this file actually exists in each version
                                                of the library.
                                            </i>
                                        </small>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td><code class="key">results[].description</code></td>
                                <td>
                                    <code class="key">optional</code> <code class="key">string</code>
                                    <p>
                                        The description of the library if it has been provided in the cdnjs
                                        package.json file
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td><code class="key">results[].version</code></td>
                                <td>
                                    <code class="key">optional</code> <code class="key">string</code>
                                    <p>
                                        The latest version of the library that is available on cdnjs.
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td><code class="key">results[].keywords</code></td>
                                <td>
                                    <code class="key">optional</code> <code class="key">array&lt;string&gt;</code>
                                    <p>
                                        An array of keywords provided in the cdnjs package.json for the library.
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td><code class="key">results[].alternativeNames</code></td>
                                <td>
                                    <code class="key">optional</code> <code class="key">array&lt;string&gt;</code>
                                    <p>
                                        An array of other names that might be used for the library. These cannot be
                                        substituted for the actual library name when navigating the cdnjs API and
                                        website.
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td><code class="key">results[].fileType</code></td>
                                <td>
                                    <code class="key">optional</code> <code class="key">string</code>
                                    <p>
                                        The file type (extension) for the default file defined for the library in the
                                        cdnjs package.json
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td><code class="key">total</code></td>
                                <td>
                                    <code class="key">integer</code>
                                    <p>
                                        The total number of libraries returned in the request.
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="right">
                    <h3>
                        <a href="https://api.cdnjs.com/libraries">
                            <code class="key">https://api.cdnjs.com/libraries</code>
                        </a>
                    </h3>
                    <p>
                        <code class="example">{"results":[{"name":"vue","latest":"https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js"},{"name":"react","latest":"https://cdnjs.cloudflare.com/ajax/libs/react/16.13.0/umd/react.production.min.js"},{"name":"react-dom","latest":"https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.13.0/umd/react-dom.production.min.js"},{"name":"twitter-bootstrap","latest":"https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/js/bootstrap.min.js"},{"name":"d3","latest":"https://cdnjs.cloudflare.com/ajax/libs/d3/5.15.0/d3.min.js"},{"name":"axios","latest":"https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"},{"name":"animate.css","latest":"https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"},{"name":"font-awesome","latest":"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"}, ...],"total":3451}</code>
                    </p>
                    <p>
                        <small>
                            <i>Example response has been trimmed to remove items in the results array.</i>
                        </small>
                    </p>

                    <h3>
                        <a href="https://api.cdnjs.com/libraries?search=jquery">
                            <code class="key">https://api.cdnjs.com/libraries?search=jquery</code>
                        </a>
                    </h3>
                    <p>
                        <code class="example">{"results":[{"name":"jquery","latest":"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"},{"name":"jquery-compat","latest":"https://cdnjs.cloudflare.com/ajax/libs/jquery-compat/3.0.0-alpha1/jquery.min.js"},{"name":"blueimp-file-upload","latest":"https://cdnjs.cloudflare.com/ajax/libs/blueimp-file-upload/10.8.0/js/jquery.fileupload.min.js"},{"name":"fullPage.js","latest":"https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/3.0.8/fullpage.min.css"},{"name":"select2","latest":"https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.12/js/select2.min.js"},{"name":"chosen","latest":"https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.jquery.min.js"},{"name":"Sortable","latest":"https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.10.1/Sortable.min.js"},{"name":"popmotion","latest":"https://cdnjs.cloudflare.com/ajax/libs/popmotion/8.7.1/popmotion.global.min.js"}, ...],"total":846}</code>
                    </p>
                    <p>
                        <small>
                            <i>Example response has been trimmed to remove items in the results array.</i>
                        </small>
                    </p>

                    <p>
                        This endpoint is directly powered by our Algolia index, the same one that is used on this
                        website for the search box at the top and on the
                        <router-link :to="{ name: 'libraries' }">
                            Libraries page
                        </router-link>.
                    </p>
                </div>
            </div>

            <h2 id="library">
                Getting a specific library on cdnjs
            </h2>
            <div class="doc">
                <div class="left">
                    <p>
                        The <code>libraries/:library</code> endpoint allows for data on a specific library to be
                        requested and will return a JSON object with all library data properties by default.
                    </p>

                    <h3>JSON Response</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Property</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!--<tr>
                                <td><code class="key">results</code></td>
                                <td>
                                    <code class="key">array&lt;object&gt;</code>
                                    <p>
                                        This property will contain an object for every library that cdnjs has available.
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td><code class="key">results[].name</code></td>
                                <td>
                                    <code class="key">string</code>
                                    <p>
                                        This will be the full name of the library, as stored on cdnjs.
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td><code class="key">results[].latest</code></td>
                                <td>
                                    <code class="key">string</code>
                                    <p>
                                        This will be the URL of the default file on the latest version of the library.
                                    </p>
                                    <p>
                                        <i>
                                            It is important to note that this URL is based on the latest version number of
                                            the library and the default file name configured, there is no validation in
                                            place to ensure that this URL will actually serve a valid asset.
                                        </i>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td><code class="key">total</code></td>
                                <td>
                                    <code class="key">integer</code>
                                    <p>
                                        The total number of libraries returned in the request.
                                    </p>
                                </td>
                            </tr>-->
                        </tbody>
                    </table>
                </div>
                <div class="right">
                    <!--<h3>
                        <a href="https://api.cdnjs.com/libraries">
                            <code class="key">https://api.cdnjs.com/libraries</code>
                        </a>
                    </h3>
                    <p>
                        <code class="example">{"results":[{"name":"vue","latest":"https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js"},{"name":"react","latest":"https://cdnjs.cloudflare.com/ajax/libs/react/16.13.0/umd/react.production.min.js"},{"name":"react-dom","latest":"https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.13.0/umd/react-dom.production.min.js"},{"name":"twitter-bootstrap","latest":"https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/js/bootstrap.min.js"},{"name":"d3","latest":"https://cdnjs.cloudflare.com/ajax/libs/d3/5.15.0/d3.min.js"},{"name":"axios","latest":"https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"},{"name":"animate.css","latest":"https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"},{"name":"font-awesome","latest":"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"}, ...],"total":3451}</code>
                    </p>
                    <p>
                        <small>
                            <i>Example response has been trimmed to remove items in the results array.</i>
                        </small>
                    </p>
                    <p>
                        This endpoint is directly powered by our Algolia index, the same one that is used on this
                        website for the search box at the top and on the
                        <router-link :to="{ name: 'libraries' }">
                            Libraries page
                        </router-link>.
                    </p>-->
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Breadcrumbs from '../components/breadcrumbs';
    import breadcrumbs from '../util/breadcrumbs';
    import setMeta from '../util/set_meta';

    const meta = {
        title: 'API Documentation',
        breadcrumb: 'API Documentation',
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
        },
        async asyncData (data) {
            return {
                crumbs: await breadcrumbs(data.route, data.app.router, {}),
            };
        },
    };
</script>
