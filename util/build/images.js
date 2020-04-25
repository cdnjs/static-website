import path from 'path';
import consola from 'consola';
import imagemin from 'imagemin';
import imageminOptipng from 'imagemin-optipng';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminSvgo from 'imagemin-svgo';

const png = async (builder) => {
    await imagemin(
        [path.join(builder.nuxt.options.generate.dir, '*.png')],
        {
            destination: builder.nuxt.options.generate.dir,
            plugins: [
                imageminOptipng({
                    optimizationLevel: 4,
                }),
            ],
        },
    );
    consola.success('Optimized static PNG images');
};

const jpg = async (builder) => {
    const nuxtImg = path.join(builder.nuxt.options.generate.dir, '_nuxt', 'img');
    await imagemin(
        [path.join(nuxtImg, '*.jpg')],
        {
            destination: nuxtImg,
            plugins: [
                imageminJpegtran({
                    progressive: false,
                    arithmetic: false,
                }),
            ],
        },
    );
    consola.success('Optimized bundled JPG images');
};

const svg = async (builder) => {
    const nuxtImg = path.join(builder.nuxt.options.generate.dir, '_nuxt', 'img');
    await imagemin(
        [path.join(nuxtImg, '*.svg')],
        {
            destination: nuxtImg,
            plugins: [
                imageminSvgo(),
            ],
        },
    );
    consola.success('Optimized bundled SVG images');
};

export default async (builder) => {
    consola.info('Optimizing images');
    await png(builder).catch(err => consola.error(err));
    await jpg(builder).catch(err => consola.error(err));
    await svg(builder).catch(err => consola.error(err));
};
