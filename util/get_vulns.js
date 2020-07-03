import fetch from 'node-fetch';
import { snykApi, snykKey } from '../data/config';

export default async (library, version) => {
    let libname = library.name;
    if (library.autoupdate && library.autoupdate.source === 'npm') {
        libname = library.autoupdate.target;
    }
    if (libname.endsWith('.js')) {
        libname = libname.slice(0, -3);
    }

    const res = await fetch(`${snykApi}/test/npm/lib/${libname}/${version}`,
        { headers: { Authorization: snykKey } });
    return res.json();
};
