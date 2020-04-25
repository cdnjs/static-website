export const defaultTitle = 'cdnjs - The #1 free and open source CDN built to make life easier for developers';
export const defaultDesc = 'Simple. Fast. Reliable. Content delivery at its finest. cdnjs is a web CDN service, trusted by over 985,000,000 websites, working to make it faster and easier to load library files to your websites.';

export default (meta, context) => {
    let contextTitle = meta.title || '';
    if (typeof contextTitle === 'function') { contextTitle = contextTitle(context); }
    let contextDesc = meta.desc || '';
    if (typeof contextDesc === 'function') { contextDesc = contextDesc(context); }
    const pageTitle = `${contextTitle}${contextTitle ? ' - ' : ''}${defaultTitle}`;
    const pageDesc = `${contextDesc}${contextDesc ? ' - ' : ''}${defaultDesc}`;

    return {
        title: pageTitle,
        meta: [
            { hid: 'title', name: 'title', content: pageTitle },
            { hid: 'description', name: 'description', content: pageDesc },

            { hid: 'twitter:title', name: 'twitter:title', content: pageTitle },
            { hid: 'twitter:description', name: 'twitter:description', content: pageDesc },

            { hid: 'og:title', prefix: 'og: http://ogp.me/ns#', property: 'og:title', content: pageTitle },
            { hid: 'og:description', prefix: 'og: http://ogp.me/ns#', property: 'og:description', content: pageDesc },
        ],
    };
};
