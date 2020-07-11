import { createWriteStream, readdirSync, renameSync, unlinkSync } from 'fs';
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
    ];

    // Get all the libraries, their versions & tutorials
    urls.push(...(await routes()));

    return urls;
};

export default async (base) => {
    // Create the sitemap files (gzipped) as temp files, so we don't overwrite any existing ones until we're done
    const sms = new SitemapAndIndexStream({
        limit: 10000,
        getSitemapStream: (i) => {
            const sitemapStream = new SitemapStream({ hostname: process.env.SITE_HOST });
            const name = `sitemap-${i}.xml`;

            sitemapStream
                .pipe(createGzip())
                .pipe(createWriteStream(join(base, `${name}.gz.temp`)));

            return [`${process.env.SITE_HOST.replace(/\/+$/, '')}/${name}`, sitemapStream];
        },
    });
    sms
        .pipe(createGzip())
        .pipe(createWriteStream(join(base, 'sitemap-index.xml.gz.temp')));

    // Load all the library URLs from the API
    consola.info('Loading sitemap URLs');
    const urls = await getUrls();

    // Generate the new sitemaps
    consola.info(`Generating sitemaps with ${urls.length.toLocaleString()} URLs`);
    urls.forEach(item => sms.write(item));
    sms.end();

    // Figure out which maps are new and will be renamed, as well as which maps can be removed
    const files = readdirSync(base);
    const newMaps = files.filter(x => x.match(/^sitemap-(index|\d+)\.xml\.gz\.temp$/) !== null);
    const oldMaps = files.filter(x => x.match(/^sitemap-(index|\d+)\.xml\.gz$/) !== null && !newMaps.includes(`${x}.temp`));

    // Rename the new maps, removing the temp prefix
    newMaps.forEach(map => renameSync(join(base, map), join(base, map.slice(0, map.length - 5))));

    // Remove the old maps
    oldMaps.forEach(map => unlinkSync(join(base, map)));

    consola.success('Generated sitemaps');
};
