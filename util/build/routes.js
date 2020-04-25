const chunk = require('chunk');
const fetch = require('node-fetch');
const { baseApi } = require('../../data/config');

module.exports = async () => {
    // Get the libs
    const libsRaw = await fetch(`${baseApi}/libraries?fields=name`);
    const libsJson = await libsRaw.json();
    const libs = libsJson.results.map((lib) => {
        // TODO: Add all version routes to here!
        // TODO: Add tutorials to api.cdnjs.com/libraries/:library, so that tutorial routes can also be done here.
        //       So that we're only making one API call per library here, not two.
        return [
            {
                url: `/libraries/${lib.name}`,
                priority: 0.6,
            },
            {
                url: `/libraries/${lib.name}/tutorials`,
                priority: 0.4,
            },
        ];
    }).flat(1);

    // Get tutorials
    // FIXME: Add tutorials meta data to api.cdnjs.com/libraries, so we don't need all this messy async chunking
    const tutsAsync = libsJson.results.map((lib) => {
        return async () => {
            const tutsRaw = await fetch(`${baseApi}/libraries/${lib.name}/tutorials`);
            const tutsJson = await tutsRaw.json();
            return Object.keys(tutsJson).map((tut) => {
                return {
                    url: `/libraries/${lib.name}/tutorials/${tut}`,
                    priority: 0.5,
                };
            });
        };
    });
    const tutsChunks = chunk(tutsAsync, 50);
    const failed = [];
    const tuts = [];
    for (const tutsChunk of tutsChunks) {
        const chunkRes = await Promise.all(tutsChunk.map(cb => cb().catch(() => failed.push(cb))));
        tuts.push(...chunkRes.flat(1));
    }
    for (const failure of failed) {
        const result = await failure().catch(e => console.warn(e));
        if (result) { tuts.push(...result); }
    }

    // Combine and sort
    return [...libs, ...tuts].filter(x => !!x && !!x.url).sort((a, b) => a.url.localeCompare(b.url));
};
