import { join } from 'path';
import { promises as fs } from 'fs';
import consola from 'consola';

export default async (builder) => {
    consola.info('Generating robots.txt');

    const disallow = process.env.ROBOTS_DISALLOW && process.env.ROBOTS_DISALLOW === '1';
    const sitemap = process.env.NODE_ENV && process.env.NODE_ENV === 'production';
    const base = process.env.SITE_HOST.trim().replace(/\/*$/, '');
    await fs.writeFile(
        join(builder.nuxt.options.buildDir, 'dist', 'static', 'robots.txt'),
        `User-agent: *\n${disallow ? 'Disallow: /' : 'Allow: *'}${sitemap ? `\n\nSitemap: ${base}/sitemap-index.xml` : ''}`,
    );

    consola.success('Generated robots.txt');
};
