import chunk from 'chunk';
import fetch from 'node-fetch';
import { baseApi } from '../../data/config';
import getLibrary from '../get_library';

export default async () => {
    // Create the lib promises
    const libsRaw = await fetch(`${baseApi}/libraries?fields=name`);
    const libsJson = await libsRaw.json();
    const libsAsync = libsJson.results.map((lib) => {
        return async () => {
            const libJson = await getLibrary(lib.name);

            const tutorials = libJson.tutorials.map((tut) => {
                return {
                    url: `/libraries/${lib.name}/tutorials/${tut.id}`,
                    priority: 0.5,
                    data: tut,
                };
            });

            // FIXME: Use library.versions here, not library.assets
            const versions = libJson.assets ? libJson.assets.map((version) => {
                return {
                    url: `/libraries/${lib.name}/${version.version}`,
                    priority: 0.5,
                    data: libJson,
                };
            }) : [];

            return [
                {
                    url: `/libraries/${lib.name}`,
                    priority: 0.6,
                    data: libJson,
                },
                ...tutorials,
                ...versions,
                {
                    url: `/libraries/${lib.name}/tutorials`,
                    priority: 0.4,
                    data: libJson.tutorials,
                },
            ];
        };
    });

    // Split into chunks and fetch
    const libsChunks = chunk(libsAsync, 50);
    const failed = [];
    const libs = [];
    for (const libsChunk of libsChunks) {
        const chunkRes = await Promise.all(libsChunk.map(cb => cb().catch(() => failed.push(cb))));
        libs.push(...chunkRes.flat(1));
    }
    for (const failure of failed) {
        const result = await failure().catch(e => console.warn(e));
        if (result) { libs.push(...result); }
    }

    // Combine and sort
    const cleaned = libs.filter(x => !!x && !!x.url).sort((a, b) => a.url.localeCompare(b.url));
    console.info(`Loaded ${cleaned.length.toLocaleString()} routes`);
    return cleaned;
};
