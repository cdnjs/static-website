const fetch = require('node-fetch');
const searchClient = require('./search_client');
const index = searchClient.initIndex('libraries');

const api = async lib => {
    const res = await fetch(`https://api.cdnjs.com/libraries/${encodeURIComponent(lib)}`);
    return await res.json();
};

const cdn = async lib => {
    const res = await fetch(`https://cdnjs.cloudflare.com/ajax/libs/${encodeURIComponent(lib)}/package.json`);
    return await res.json();
};

module.exports = async lib => {
    // Get data from cdnjs API
    const apiData = await api(lib);

    // Not found
    if (Object.entries(apiData).length === 0 && apiData.constructor === Object) throw new Error('Library not found');

    // Get Algolia data
    apiData.algolia = (await index.findObject(hit => hit.name === apiData.name)).object;

    // Get package.json from CDN
    // apiData['package.json'] = await cdn(lib); // FIXME: Needs CORS + correct mime-type

    // Done
    return apiData;
};
