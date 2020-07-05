const path = require('path');
const { Nuxt, loadNuxtConfig } = require('nuxt');
const { readFile } = require('fs');

const app = require('express')();
const port = process.env.PORT || 3000;

// TODO: Add background job to refresh sitemaps
// const sitemap = require('esm')(module)('../util/sitemap').default;

const start = async () => {
    // Create the Nuxt instance
    const config = await loadNuxtConfig({ for: 'start' });
    const nuxt = new Nuxt(config);

    // Change static source to .nuxt/dist/static
    const buildStatic = path.join(nuxt.server.options.buildDir, 'dist', 'static');
    nuxt.server.options.dir.static = path.relative(
        nuxt.server.options.srcDir,
        buildStatic,
    );

    // Handle sitemaps ourselves
    app.get('/sitemap*.xml(.gz)?', (req, res) => {
        try {
            readFile(path.join(buildStatic, `${req.url.replace(/^\/+/, '').replace(/\.gz$/, '')}.gz`), (err, data) => {
                if (err) throw err;

                res.header('Content-Type', 'application/xml');
                res.header('Content-Encoding', 'gzip');
                res.send(data);
            });
        } catch (e) {
            // Sentry?
            console.error(e);
        }
    });

    // Render every route with Nuxt.js
    app.use(nuxt.render);

    // Start the server
    app.listen(port);
    console.log(`Server listening on port ${port}.`);
};

start();
