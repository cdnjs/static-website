export default (base, library, tutorials, keywords) => JSON.stringify({
    '@context': 'http://schema.org',
    '@type': 'CreativeWorkSeries',
    name: `${library} Tutorials`,
    headline: `${library} Tutorials`,
    description: `Tutorials for ${library} on cdnjs`,
    keywords,
    url: `${base}libraries/${library}/tutorials`,
    inLanguage: 'en',
    accessMode: 'textual',
    accessModeSufficient: 'textual',
    isAccessibleForFree: true,
    isPartOf: `${base}libraries/${library}`,
    hasPart: Object.entries(tutorials).map(d => ({
        '@type': 'TechArticle',
        name: d[1].name,
        url: `${base}libraries/${library}/tutorials/${d[0]}`,
    })),
    publisher: {
        '@type': 'Organization',
        name: 'cdnjs',
        url: base,
    },
    sourceOrganization: {
        '@type': 'Organization',
        name: 'cdnjs',
        url: base,
    },
});
