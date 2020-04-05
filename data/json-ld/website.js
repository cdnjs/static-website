export default base => ({
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    name: 'cdnjs',
    alternateName: 'CDNJS',
    description: 'The #1 free and open source CDN built to make life easier for developers',
    image: `${base}favicon.png`,
    thumbnailUrl: `${base}banner.png`,
    url: base,
    sameAs: ['https://github.com/cdnjs', 'https://twitter.com/cdnjs', 'https://linkedin.com/company/cdnjs'],
    potentialAction: {
        '@type': 'SearchAction',
        target: `${base}libraries?q={search_term_string}`,
        'query-input': 'name=search_term_string',
    },
});
