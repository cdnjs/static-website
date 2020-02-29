const fetch = require('node-fetch');
const spdxLicenseIds = require('spdx-license-ids');
const searchClient = require('./search_client');
const index = searchClient.initIndex('libraries');

const api = async lib => {
    const res = await fetch(`https://api.cdnjs.com/libraries/${encodeURIComponent(lib)}`);
    return await res.json();
};

/*const cdn = async lib => {
    const res = await fetch(`https://cdnjs.cloudflare.com/ajax/libs/${encodeURIComponent(lib)}/package.json`);
    return await res.json();
};*/

const licenses = lib => {
    // Create the licenses array
    let licenses = Array.isArray(lib.licenses) ? lib.licenses : [];

    // If a single license, stick it into an array
    if (lib.license !== undefined) licenses.push(lib.license);

    // Transform into objects
    licenses = licenses.map(license => {
        // If the license is just a string name, make it an object
        if (typeof license !== 'object') {
            const name = license.toString();
            license = {
                type: name,
                url: '#',
            };
        }

        // If the license is a valid spdx identified, set the URL
        if (spdxLicenseIds.includes(license.type))
            license.url = 'https://spdx.org/licenses/' + license.type + '.html';

        // Done
        return license;
    });

    // Done
    return licenses;
};

module.exports = async lib => {
    // Get data from cdnjs API
    const apiData = await api(lib);

    // Not found
    if (Object.entries(apiData).length === 0 && apiData.constructor === Object) throw new Error('Library not found');

    // Get Algolia data
    apiData.algolia = (await index.findObject(hit => hit.name === apiData.name)).object;

    // Get license data
    apiData.licenses = licenses(apiData);

    // Get package.json from CDN
    // FIXME: Needs CORS + correct mime-type
    // apiData['package.json'] = await cdn(lib);

    // Done
    return apiData;
};
