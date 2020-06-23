import firstBy from 'thenby';
import globToRegExp from 'glob-to-regexp';
import fileType from './file_type';
import getVersion from './get_version';

const sriAttr = (asset) => {
    if (!asset.sri) { return ''; }
    return ` integrity="${asset.sri}" crossorigin="anonymous"`;
};

const code = (asset) => {
    switch (asset.type) {
    case 'css':
        return `<link rel="stylesheet" href="${asset.url}"${sriAttr(asset)} />`;

    case 'js':
        return `<script src="${asset.url}"${sriAttr(asset)}></script>`;

    default:
        return undefined;
    }
};

const codeTitle = (asset) => {
    switch (asset.type) {
    case 'css':
        return 'Copy Link Tag';

    case 'js':
        return 'Copy Script Tag';

    default:
        return undefined;
    }
};

export const getAsset = (library, version, file, sri, whitelisted) => {
    const ext = file.split('.').reverse()[0];
    const asset = {
        library,
        version,
        file,
        sri,
        type: ext,
        category: fileType(ext),
        whitelisted,
        url: `https://cdnjs.cloudflare.com/ajax/libs/${library}/${version}/${file}`,
    };
    asset.code = code(asset);
    asset.codeTitle = codeTitle(asset);
    return asset;
};

const processAssets = (data, rawAssets) => {
    // Generate the categories
    const categories = new Set();
    categories.add('All');

    // Convert them to asset objects
    const assetObjects = rawAssets.rawFiles.map(asset => getAsset(
        data.library.name,
        data.version,
        asset,
        rawAssets.sri && asset in rawAssets.sri ? rawAssets.sri[asset] : null,
        rawAssets.files.includes(asset),
    ));

    // Convert them to asset objects and sort them
    const sortedAssets = assetObjects.sort(
        firstBy(v1 => v1.file === data.library.filename, -1)
            .thenBy((v1, v2) => v1.file.split('/').length - v2.file.split('/').length)
            .thenBy('file'),
    );

    // Determine if we have any minified files
    const minFileRe = globToRegExp('*.min.*');
    const hasMinifiedFiles = sortedAssets.reduce((prev, asset) => prev || minFileRe.test(asset.file), false);

    // Use some glob regex to determine if each file should be hidden
    const criticalFilesGlob = '{' + '*.min.js,' + '*.min.css,' + data.library.filename + '}';
    const commonFileGlob = '{' + '*.js.*,' + '*.css.*,' + data.library.filename + '}';
    const criticalFileRegExp = globToRegExp(criticalFilesGlob, { extended: true });
    const commonFileRegExp = globToRegExp(commonFileGlob, { extended: true });
    let hasHiddenFiles = false;
    const hiddenAssets = sortedAssets.map((asset) => {
        // Only hide things if we have lots of files and the current file isn't the default
        asset.hidden = false;
        if (sortedAssets.length > 20 && data.library.filename !== asset.file) {
            asset.hidden = !(hasMinifiedFiles ? criticalFileRegExp : commonFileRegExp).test(asset.file);
            hasHiddenFiles = hasHiddenFiles || asset.hidden;
        }

        // Generate the categories whilst we're here
        const cat = asset.category;
        categories.add(cat);

        // Done!
        return asset;
    });

    // Done!
    return {
        assets: hiddenAssets,
        hasHidden: hasHiddenFiles,
        categories: [...categories],
    };
};

export const getAssets = (data, limit = false) => {
    // If non-existent, return empty
    if (!data.library.versions.includes(data.version)) {
        return {
            assets: [],
            hasHidden: false,
            categories: [],
        };
    }

    // If we already have assets, just return the data
    // This shouldn't ever be used, but can be left in to avoid a call if we do happen to ever have assets
    if (data.library.assets && data.library.assets.length) {
        const rawAssets = data.library.assets.find(a => a.version === data.version);
        if (rawAssets) {
            return processAssets(data, rawAssets);
        }
    }

    // If we don't have assets, we need to load the version, so we need to return a Promise
    return new Promise((resolve, reject) => {
        getVersion(data.library.name, data.version, limit).then((version) => {
            if (version.error) {
                resolve({
                    assets: [],
                    hasHidden: false,
                    categories: [],
                });
            }
            resolve(processAssets(data, version));
        }).catch(e => reject(e));
    });
};
