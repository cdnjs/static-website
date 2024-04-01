import chunk from 'chunk';
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
    const timings = [];

    // Create the lib promises
    const libsAsync = libsJson.results.map((lib) => {
        return [lib.name, async () => {
            const start = Date.now();
            const libRaw = await fetch(`${baseApi}/libraries/${encodeURIComponent(lib.name)}?fields=versions`);
            const libJson = await libRaw.json();

            if (!libJson.versions) {
                console.warn(`No versions array for ${lib.name}`, libJson);
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

    // Split into chunks and fetch
    const libsChunksStart = Date.now();
    const libsChunks = chunk(libsAsync, 100);
    const failed = [];
    const libs = [];
    for (const libsChunk of libsChunks) {
        const chunkRes = await Promise.all(libsChunk.map(cb => cb[1]().catch(() => failed.push(cb))));
        libs.push(...chunkRes.flat(1));
    }
    for (const failure of failed) {
        const result = await failure[1]().catch(e => console.warn(failure[0], e));
        if (result) { libs.push(...result); }
    }

    // Report the timings
    consola.info(`  Fetched ${timings.length} libraries in ${Date.now() - libsChunksStart}ms`);
    timings.sort((a, b) => a[1] - b[1]);
    consola.info(`    p99: ${timings[Math.floor(timings.length * 0.99)][1]}ms`);
    consola.info(`    p90: ${timings[Math.floor(timings.length * 0.9)][1]}ms`);
    consola.info(`    p50: ${timings[Math.floor(timings.length * 0.5)][1]}ms`);

    // Ensure everything is valid & sort by URL
    return libs.filter(x => !!x && !!x.url).sort((a, b) => a.url.localeCompare(b.url));
};
