import { createWriteStream } from 'fs';
import { join } from 'path';
import { createGzip } from 'zlib';
import { SitemapAndIndexStream, SitemapStream } from 'sitemap';
import consola from 'consola';
import routes from './routes';

const getUrls = async () => {
    const urls = [
        {
            url: '/',
            priority: 1,
        },
        {
            url: '/libraries',
            priority: 0.9,
        },
        {
            url: '/about',
            priority: 0.8,
        },
        {
            url: '/api',
            priority: 0.8,
        },
        {
            url: '/sponsor',
            priority: 0.7,
        },
    ];

    // Get all the libraries, their versions & tutorials
    urls.push(...(await routes()));

    return urls;
};

export default async base => {
    const sms = new SitemapAndIndexStream({
        limit: 10000,
        getSitemapStream: i => {
            const sitemapStream = new SitemapStream({ hostname: process.env.SITE_HOST });
            const name = `sitemap-${i}.xml`;

            sitemapStream
                .pipe(createGzip())
                .pipe(createWriteStream(join(base, `${name}.gz`)));

            return [`${process.env.SITE_HOST.replace(/\/+$/, '')}/${name}`, sitemapStream];
        },
    });
    sms
        .pipe(createGzip())
        .pipe(createWriteStream(join(base, 'sitemap-index.xml.gz')));

    consola.info('Loading sitemap URLs');
    const urls = await getUrls();

    consola.info(`Generating sitemaps with ${urls.length.toLocaleString()} URLs`);
    urls.forEach(item => sms.write(item));
    sms.end();

    consola.success('Generated sitemaps');
};



