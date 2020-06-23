export default (base, tutorial, tutorialName, library) => ({
    '@context': 'http://schema.org',
    '@type': 'TechArticle',
    name: tutorial.name,
    headline: tutorial.name,
    description: tutorial.description,
    keywords: tutorial.keywords && tutorial.keywords.join(','),
    url: `${base}libraries/${library}/tutorials/${tutorialName}`,
    inLanguage: 'en',
    accessMode: 'textual',
    accessModeSufficient: 'textual',
    isAccessibleForFree: true,
    image: `${base}banner.png`,
    isPartOf: {
        '@type': 'CreativeWorkSeries',
        url: `${base}libraries/${library}/tutorials`,
    },
    author: {
        '@type': 'Person',
        name: tutorial.author.name,
    },
    publisher: {
        '@type': 'Organization',
        name: 'cdnjs',
        url: base,
        logo: {
            type: 'ImageObject',
            url: `${base}favicon.png`,
        },
    },
    sourceOrganization: {
        '@type': 'Organization',
        name: 'cdnjs',
        url: base,
    },
    dateModified: tutorial.modified,
    // FIXME: remove fallback once https://github.com/cdnjs/api-server/pull/23 merged
    datePublished: tutorial.created || new Date(),
});
