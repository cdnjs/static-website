const path = require('path');
const consola = require('consola');
const imagemin = require('imagemin');
const imageminOptipng = require('imagemin-optipng');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminSvgo = require('imagemin-svgo');

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

module.exports = async (builder) => {
    consola.info('Optimizing images');
    await png(builder);
    await jpg(builder);
    await svg(builder);
};
