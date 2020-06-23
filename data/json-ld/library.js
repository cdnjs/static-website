import { getAssets } from '../../util/get_asset';

export default (base, library, libraryName) => {
    let downloadUrl = library.filename ? `https://cdnjs.cloudflare.com/ajax/libs/${libraryName}/${library.version}/${library.filename}` : undefined;
    let softwareVersion = library.version;

    // This shouldn't ever be used as we don't fetch library.assets,
    //  but it can be left in to provide better data if library.assets is ever present
    if (library.assets && library.assets.length) {
        if (!library.assets.find(v => v.version === softwareVersion)) {
            softwareVersion = library.assets[0].version;
        }

        // This would return a Promise if version wasn't present in library.assets
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
