import chunk from 'chunk';
import fetch from 'node-fetch';
import { baseApi } from '../../data/config';

export default async () => {
    // Create the lib promises
    const libsRaw = await fetch(`${baseApi}/libraries?fields=name`);
    const libsJson = await libsRaw.json();
    const libsAsync = libsJson.results.map((lib) => {
        return [lib.name, async () => {
            const libRaw = await fetch(`${baseApi}/libraries/${encodeURIComponent(lib.name)}?fields=tutorials,versions`);
            const libJson = await libRaw.json();

            const tutorials = libJson.tutorials.map((tut) => {
                return {
                    url: `/libraries/${lib.name}/tutorials/${tut.id}`,
                    priority: 0.5,
                };
            });

            const versions = libJson.versions.map((version) => {
                return {
                    url: `/libraries/${lib.name}/${version}`,
                    priority: 0.5,
                };
            });

            return [
                {
                    url: `/libraries/${lib.name}`,
                    priority: 0.6,
                },
                ...tutorials,
                ...versions,
                {
                    url: `/libraries/${lib.name}/tutorials`,
                    priority: 0.4,
                },
            ];
        }];
    });

    // Split into chunks and fetch
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

    // Ensure everything is valid & sort by URL
    return libs.filter(x => !!x && !!x.url).sort((a, b) => a.url.localeCompare(b.url));
};
