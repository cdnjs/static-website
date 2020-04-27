const path = require('path');
const { Nuxt, loadNuxtConfig } = require('nuxt');

const app = require('express')();
const port = process.env.PORT || 3000;

const start = async () => {
    // Create the Nuxt instance
    const config = await loadNuxtConfig({ for: 'start' });
    const nuxt = new Nuxt(config);

    // Change static source to .nuxt/dist/static
    nuxt.server.options.dir.static = path.relative(
        nuxt.server.options.srcDir,
        path.join(nuxt.server.options.buildDir, 'dist', 'static'),
    );

    // Render every route with Nuxt.js
    app.use(nuxt.render);

    // Start the server
    app.listen(port);
    console.log(`Server listening on port ${port}.`);
};

start();
