import fetch from 'node-fetch';
import { baseApi } from '../data/config';

export default async (lib, version) => {
    const res = await fetch(`${baseApi}/libraries/${encodeURIComponent(lib)}/${encodeURIComponent(version)}`);
    return res.json();
};
