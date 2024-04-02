import fetch from 'node-fetch';
import consola from 'consola';
import { baseApi } from '../../data/config';

export default async () => {
    // Fetch the library names
    const libsStart = Date.now();
    const libsRaw = await fetch(`${baseApi}/libraries?fields=name`);
    const libsJson = await libsRaw.json();
    consola.info(`  Fetched ${libsJson.results.length} libraries in ${Date.now() - libsStart}ms`);

    // Track timings for individual libraries
    const libsAsyncStart = Date.now();
    const timings = [];

    // Create the lib promises
    const libsAsync = libsJson.results.map((lib) => {
        return [lib.name, async () => {
            const start = Date.now();
            const libRaw = await fetch(`${baseApi}/libraries/${encodeURIComponent(lib.name)}?fields=versions`);
            const libJson = await libRaw.json();

            if (!libJson.versions) {
                consola.warn(`No versions array for ${lib.name}`, libJson);
            }

            const versions = (libJson.versions || []).map((version) => {
                return {
                    url: `/libraries/${encodeURIComponent(lib.name)}/${encodeURIComponent(version)}`,
                    priority: 0.5,
                };
            });

            timings.push([lib.name, Date.now() - start]);

            return [
                {
                    url: `/libraries/${encodeURIComponent(lib.name)}`,
                    priority: 0.6,
                },
                ...versions,
            ];
        }];
    });

    // Run with a continual concurrency of 10
    const libs = [];
    const failed = [];
    const libPromise = (name, callback) => callback()
        .then(result => libs.push(...result))
        .catch(() => failed.push([name, callback]))
        .finally(() => {
            const next = libsAsync.shift();
            if (next) { return libPromise(...next); }
        });
    await Promise.all(libsAsync.splice(0, 10).map(next => libPromise(...next)));

    // Re-run any failures with a concurrency of 1
    for (const [name, callback] of failed) {
        const result = await callback().catch(e => consola.warn(name, e));
        if (result) { libs.push(...result); }
    }

    // Report the timings
    timings.sort((a, b) => a[1] - b[1]);
    consola.info(`  Fetched ${timings.length} libraries in ${Date.now() - libsAsyncStart}ms:`);
    consola.info(`    p99: ${timings[Math.floor(timings.length * 0.99)][1]}ms`);
    consola.info(`    p90: ${timings[Math.floor(timings.length * 0.9)][1]}ms`);
    consola.info(`    p50: ${timings[Math.floor(timings.length * 0.5)][1]}ms`);
    consola.info('  Slowest libraries:');
    timings.slice(-5).reverse().forEach(([name, time]) => consola.info(`    ${name}: ${time}ms`));

    // Ensure everything is valid & sort by URL
    return libs.filter(x => !!x && !!x.url).sort((a, b) => a.url.localeCompare(b.url));
};
