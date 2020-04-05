export default (base, tutorial, tutorialName, library) => JSON.stringify({
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
    isPartOf: {
        '@type': 'CreativeWorkSeries',
        url: `${base}libraries/${library}/tutorials`,
    },
    author: {
        '@type': 'Person',
        name: '{{ tutorial.author.name }}',
    },
    publisher: {
        '@type': 'Organization',
        name: 'cdnjs',
        url: '{{ base() }}',
    },
    sourceOrganization: {
        '@type': 'Organization',
        name: 'cdnjs',
        url: '{{ base() }}',
    },
});
