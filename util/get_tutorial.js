import fetch from 'node-fetch';
import { baseApi } from '../data/config';

export const getTutorials = async (lib) => {
    // Get data from cdnjs API
    const res = await fetch(`${baseApi}/libraries/${encodeURIComponent(lib)}/tutorials`);
    const apiData = await res.json();

    // Done
    return apiData;
};

export const getTutorial = async (lib, tut) => {
    // Get data from cdnjs API
    const res = await fetch(`${baseApi}/libraries/${encodeURIComponent(lib)}/tutorials/${encodeURIComponent(tut)}`);
    const apiData = await res.json();

    // Not found
    if (Object.entries(apiData).length === 0 && apiData.constructor.name === Object.name) {
        throw new Error('Tutorial not found');
    }

    // Done
    return apiData;
};
