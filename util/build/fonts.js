import path from 'path';
import Fontmin from 'fontmin';
import consola from 'consola';

const optimize = builder => new Promise((resolve, reject) => {
    const nuxtFonts = path.join(builder.nuxt.options.buildDir, 'dist', 'client', 'fonts');
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

export default async (builder) => {
    consola.info('Optimizing fonts');
    await optimize(builder).catch(err => consola.error(err));
    consola.success('Optimized bundled fonts');
};
