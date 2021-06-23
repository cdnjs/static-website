export const defaultTitle = 'cdnjs - The #1 free and open source CDN built to make life easier for developers';
export const defaultDesc = 'Simple. Fast. Reliable. Content delivery at its finest. cdnjs is a free and open-source CDN service trusted by over 12.5% of all websites, serving over 200 billion requests each month, powered by Cloudflare. We make it faster and easier to load library files on your websites.';
export const defaultKeywords = Object.freeze(['cdn', 'cdnjs', 'js', 'javascript', 'css', 'library', 'web', 'front-end',
    'free', 'open-source', 'open source', 'oss', 'npm', 'github']);

export default (meta, context) => {
    // Get meta title & desc
    let contextTitle = meta.title || '';
    if (typeof contextTitle === 'function') { contextTitle = contextTitle(context); }
    let contextDesc = meta.desc || '';
    if (typeof contextDesc === 'function') { contextDesc = contextDesc(context); }
    const pageTitle = `${contextTitle}${contextTitle ? ' - ' : ''}${defaultTitle}`;
    const pageDesc = `${contextDesc}${contextDesc ? ' - ' : ''}${defaultDesc}`;

    // Get base & page URL
    const pageUrl = context.$baseUrl.slice(0, -1) + context.$route.path;

    // Do keywords
    let contextKeywords = meta.keywords || [];
    if (typeof contextKeywords === 'function') { contextKeywords = contextKeywords(context); }
    const pageKeywords = contextKeywords.concat(defaultKeywords).join(', ');

    return {
        title: pageTitle,
        meta: [
            { hid: 'title', name: 'title', content: pageTitle },
            { hid: 'description', name: 'description', content: pageDesc },
            { hid: 'keywords', name: 'keywords', content: pageKeywords },

            { hid: 'twitter:title', name: 'twitter:title', content: pageTitle },
            { hid: 'twitter:description', name: 'twitter:description', content: pageDesc },
            { hid: 'twitter:url', name: 'twitter:url', content: pageUrl },

            { hid: 'og:title', prefix: 'og: http://ogp.me/ns#', property: 'og:title', content: pageTitle },
            { hid: 'og:description', prefix: 'og: http://ogp.me/ns#', property: 'og:description', content: pageDesc },
            { hid: 'og:url', prefix: 'og: http://ogp.me/ns#', property: 'og:url', content: pageUrl },

            { hid: 'canonical', rel: 'canonical', href: pageUrl },
        ],
    };
};
