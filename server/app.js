const path = require('path');
const { Nuxt, loadNuxtConfig } = require('nuxt');
const Sentry = require('@sentry/node');
const express = require('express');
const morgan = require('morgan');
const esm = require('esm')(module);

const { sentryDsn } = esm('../data/config');
const sitemap = esm('../util/build/sitemap').default;
const port = process.env.PORT || 3000;
Sentry.init({ dsn: sentryDsn });

const start = async () => {
    // Create the Express app
    const app = express();
    app.disable('x-powered-by');
    app.use(Sentry.Handlers.requestHandler());
    app.use(morgan('combined'));

    // Create the Nuxt instance
    const config = await loadNuxtConfig({ for: 'start' });
    const nuxt = new Nuxt(config);

    // Change static source to .nuxt/dist/static
    const buildStatic = path.join(nuxt.server.options.buildDir, 'dist', 'static');
    nuxt.server.options.dir.static = path.relative(
        nuxt.server.options.srcDir,
        buildStatic,
    );

    // Run sitemap generation in the background, every 30 mins
    let sitemapLog = '';
    setInterval(() => {
        sitemap(buildStatic).then(() => {
            sitemapLog = `Last generation completed successfully at ${new Date().toISOString()}`;
        }).catch((e) => {
            sitemapLog = `Last generation failed at ${new Date().toISOString()}\n\n${e.message}\n\n${e.stack}`;
            Sentry.captureException(e);
            console.error(e);
        });
    }, 1000 * 60 * 30);

    // Text sitemap generation log for production debugging
    app.get('/sitemap-log.txt', (req, res) => {
        res.send(sitemapLog);
    });

    // Render every route with Nuxt.js
    app.use(nuxt.render);

    // Sentry error handler
    app.use(Sentry.Handlers.errorHandler());

    // Start the server
    app.listen(port);
    console.log(`Server listening on port ${port}.`);
};

start();
