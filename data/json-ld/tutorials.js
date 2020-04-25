import Tutorial from './tutorial';

export default (base, library, tutorials, keywords) => ({
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
    hasPart: tutorials.map(d => Tutorial(base, d, d.id, library)),
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
