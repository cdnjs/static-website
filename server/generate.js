import path from 'path';
import express from 'express';
import { Nuxt } from 'nuxt';

// Import and Set Nuxt.js options
import config from '../nuxt.config.js';
const app = express();
config.dev = process.env.NODE_ENV !== 'production';

const start = () => {
    // Init Nuxt.js
    const nuxt = new Nuxt(config);
    const { host, port } = nuxt.options.server;

    // Serve the app
    app.use(express.static(path.join(__dirname, '..', 'dist')));

    // Catch-all
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'dist', '404.html')));

    // Listen
    app.listen(port, host);
    console.log(`Server listening on http://${host}:${port}`);
};

start();
