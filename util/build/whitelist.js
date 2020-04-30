import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import consola from 'consola';
import { baseApi } from '../../data/config';

const load = async (builder) => {
    // Get the whitelist
    const whitelist = await fetch(`${baseApi}/whitelist`);
    const data = await whitelist.json();

    // Export it to JSON
    await fs.promises.writeFile(path.join(builder.nuxt.options.srcDir, 'data', 'whitelist.json'), JSON.stringify(data));
};

export default async (builder) => {
    consola.info('Fetching whitelist');
    await load(builder).catch(err => consola.error(err));
    consola.success('Fetched whitelist data');
};
