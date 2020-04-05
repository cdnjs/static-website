import { getAssets } from '../../util/get_asset';

export default (base, library, libraryName) => {
    const { assets } = getAssets({ library, version: library.version });

    return {
        '@context': 'http://schema.org',
        '@type': 'WebApplication',
        name: library.name,
        description: library.description,
        keywords: library.keywords && library.keywords.join(','),
        url: `${base}libraries/${libraryName}`,
        downloadUrl: assets.map(asset => asset.url),
        softwareVersion: library.version,
        applicationCategory: 'library',
        operatingSystem: 'any',
        hasPart: {
            '@type': 'CreativeWorkSeries',
            url: `${base}libraries/${libraryName}/tutorials`,
        },
    };
};
