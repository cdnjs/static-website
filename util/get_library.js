import fetch from 'node-fetch';
import { baseApi } from '../data/config';
import searchClient from './search_client';

const spdxLicenseIds = require('spdx-license-ids/index.json');

const index = searchClient.initIndex('libraries');

const apiFields = () => new Set([
    'name', 'autoupdate', 'licenses', 'license', 'homepage', 'description', 'keywords', 'version', 'filename', 'versions',
]);

const apiFieldsQuery = fields => `?fields=${Array.from(fields).map(f => encodeURIComponent(f)).join(',')}`;

const api = async (lib, limit) => {
    const fields = apiFields();

    // Max resp size: .25 * 1024 * 1024 bytes [.25mb]
    const res = await fetch(`${baseApi}/libraries/${encodeURIComponent(lib)}${apiFieldsQuery(fields)}`,
        { size: limit ? 0.25 * 1024 * 1024 : undefined });

    return res.json();
};

const algolia = async (name) => {
    const data = await index.getObject(name).catch(() => {});
    return data || {};
};

/* const cdn = async lib => {
    const res = await fetch(`https://cdnjs.cloudflare.com/ajax/libs/${encodeURIComponent(lib)}/package.json`);
    return res.json();
}; */

const licenses = (lib) => {
    // Create the licenses array
    let licenses = Array.isArray(lib.licenses) ? lib.licenses : [];

    // If a single license, stick it into an array
    if (lib.license !== undefined && lib.license) { licenses.push(lib.license); }

    // Transform into objects
    licenses = licenses.map((license) => {
        // If the license is just a string name, make it an object
        if (typeof license !== 'object') {
            const name = license.toString();
            license = {
                type: name,
                url: '#',
            };
        }

        // If the license is a valid spdx identified, set the URL
        if (license && license.type && spdxLicenseIds.includes(license.type)) {
            license.url = 'https://spdx.org/licenses/' + license.type + '.html';
        }

        // Done
        return license;
    }).filter(license => license && license.type && license.url);

    // Done
    return licenses;
};

export default async (lib, limit = true) => {
    // Get data from cdnjs API
    const apiData = await api(lib, limit);

    // Not found
    if (apiData.constructor.name !== Object.name ||
        Object.entries(apiData).length === 0 ||
        (apiData.error && apiData.status && apiData.status === 404)) {
        throw new Error('Library not found');
    }

    // Get Algolia data
    apiData.algolia = await algolia(apiData.name);

    // Get license data
    apiData.licenses = licenses(apiData);

    // Get package.json from CDN
    // FIXME: Needs CORS + correct mime-type
    // apiData['package.json'] = await cdn(lib);

    // Done
    return apiData;
};
