import path from 'path';
import consola from 'consola';
import copyfiles from 'copyfiles';

const copy = (builder) => {
    return new Promise((resolve) => {
        copyfiles(
            [
                path.join(builder.nuxt.options.srcDir, 'static', '*'),
                path.join(builder.nuxt.options.buildDir, 'dist', 'static'),
            ],
            path.normalize(builder.nuxt.options.srcDir).split(path.sep).length + 1,
            () => {
                resolve();
            },
        );
    });
};

export default async (builder) => {
    consola.info('Copying static files');
    await copy(builder).catch(err => consola.error(err));
    consola.success('Copied static files');
};
