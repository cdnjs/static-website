import fetch from 'node-fetch';
import { baseApi } from '../data/config';

export default async (lib, version, limit = false) => {
    // Max resp size: .25 * 1024 * 1024 bytes [.25mb]
    const res = await fetch(`${baseApi}/libraries/${encodeURIComponent(lib)}/${encodeURIComponent(version)}`,
        { size: limit ? 0.25 * 1024 * 1024 : undefined });
    return res.json();
};
