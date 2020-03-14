import fetch from 'node-fetch';

export default async (pageId) => {
    const res = await fetch(`https://${pageId}.statuspage.io/api/v2/status.json`);
    return res.json();
};
