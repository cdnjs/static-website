import fetch from 'node-fetch';
import { baseApi } from '../data/config';

export default async () => {
    const res = await fetch(`${baseApi}/stats`);
    return res.json();
};
