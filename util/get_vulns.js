import fetch from 'node-fetch';
import { snykApi, snykKey } from '../data/config';

export default async (library, version) => {
    const lib = library.autoupdate && library.autoupdate.source === 'npm' ? library.autoupdate.target : library.name;

    const res = await fetch(`${snykApi}/test/npm/lib/${encodeURIComponent(lib)}/${encodeURIComponent(version)}`,
        { headers: { Authorization: snykKey } });
    return res.json();
};
