<template>
    <section>
        <header>
            <Breadcrumbs></Breadcrumbs>
            <div class="content">
                <h1>
                    cdnjs provides a simple API to allow anyone to quickly query the libraries we have on the CDN.
                </h1>
                <p>
                    We provide two main endpoints, the <code>libraries</code> endpoint which allows anyone to search
                    through the full set of libraries we offer, and the <code>libraries/:id</code> endpoint which allows
                    for detailed data to be ascertained for a specific library.
                </p>
            </div>
        </header>
        <div class="content">
            <h2>Viewing all libraries on cdnjs</h2>
            <div class="doc">
                <div class="left">
                    <p>
                        The plain <code>libraries</code> endpoint will return a JSON object with two properties.
                        The first is the <code>results</code> property, which will be an array of all libraries that
                        cdnjs has to offer.
                        The second is the <code>total</code> property, which is an integer representing the number of
                        libraries the API endpoint returned.
                    </p>
                    <p>
                        By default, each library object within the <code>results</code> array will only have two
                        properties present.
                        The first property, <code>name</code>
                    </p>
                    <p>
                        This endpoint is directly powered by our Algolia index, the same one that is used on this
                        website for the search box at the top and on the
                        <router-link :to="{ name: 'libraries' }">
                            Libraries page
                        </router-link>.
                    </p>
                </div>
                <div class="right">
                    <h3><a href="https://api.cdnjs.com/libraries"><code>https://api.cdnjs.com/libraries</code></a></h3>
                    <p>
                        <code class="example">{"results":[{"name":"vue","latest":"https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js"},{"name":"react","latest":"https://cdnjs.cloudflare.com/ajax/libs/react/16.13.0/umd/react.production.min.js"},{"name":"react-dom","latest":"https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.13.0/umd/react-dom.production.min.js"},{"name":"twitter-bootstrap","latest":"https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/js/bootstrap.min.js"},{"name":"d3","latest":"https://cdnjs.cloudflare.com/ajax/libs/d3/5.15.0/d3.min.js"},{"name":"axios","latest":"https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"},{"name":"animate.css","latest":"https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"},{"name":"font-awesome","latest":"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"}, ...],"total":3451}</code>
                    </p>
                    <p>
                        <small>
                            <i>Example response has been trimmed to remove items in the results array.</i>
                        </small>
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Breadcrumbs from '../components/breadcrumbs';
    import setMeta from '../util/set_meta';

    const meta = {
        title: 'API',
        breadcrumb: 'API',
        classes: [],
    };

    export default {
        name: 'API',
        meta,
        head () {
            return setMeta(meta, this.$nuxt.context);
        },
        components: {
            Breadcrumbs,
        },
    };
</script>
