import fetch from 'node-fetch';
const snykApi = 'http://snyk-widget.herokuapp.com';
const key = 'VRHr?YP_Gb7d9LFh$ugktZHUe+gGBp#LGG3*bDLt';

export default async (library, version) => {
    // await new Promise(r => setTimeout(r, 10000));
    let libname = library.name;
    if (library.autoupdate && library.autoupdate.source === 'npm') {
        libname = library.autoupdate.target;
    }
    if (libname.endsWith('.js')) {
        libname = libname.slice(0, -3);
    }

    const res = await fetch(`${snykApi}/test/npm/lib/${libname}/${version}`,
        { headers: { Authorization: key } });
    return res.json();
};
