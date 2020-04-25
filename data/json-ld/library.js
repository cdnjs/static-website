import { getAssets } from '../../util/get_asset';

export default (base, library, libraryName) => {
    let downloadUrl; let softwareVersion = library.version;
    if (library.assets && library.assets.length) {
        if (!library.assets.find(v => v.version === softwareVersion)) { softwareVersion = library.assets[0].version; }
        const { assets } = getAssets({ library, version: softwareVersion });
        downloadUrl = assets.map(asset => asset.url);
    }

    return {
        '@context': 'http://schema.org',
        '@type': 'WebApplication',
        name: library.name,
        description: library.description,
        keywords: library.keywords && library.keywords.join(','),
        url: `${base}libraries/${libraryName}`,
        downloadUrl,
        softwareVersion: library.version,
        applicationCategory: 'library',
        operatingSystem: 'any',
        hasPart: {
            '@type': 'CreativeWorkSeries',
            url: `${base}libraries/${libraryName}/tutorials`,
        },
    };
};
