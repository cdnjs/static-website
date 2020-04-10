const path = require('path');
const Fontmin = require('fontmin');
const consola = require('consola');

const optimize = builder => new Promise((resolve, reject) => {
    const nuxtFonts = path.join(builder.nuxt.options.generate.dir, '_nuxt', 'fonts');
    const fontmin = new Fontmin()
        .src(path.join(nuxtFonts, '*.@(woff|woff2)'))
        .dest(nuxtFonts);
    fontmin.run((err) => {
        if (err) {
            return reject(err);
        }
        resolve();
    });
});

module.exports = async (builder) => {
    consola.info('Optimizing fonts');
    await optimize(builder).catch(err => consola.error(err));
    consola.success('Optimized bundled fonts');
};
