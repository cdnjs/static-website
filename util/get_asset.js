import firstBy from 'thenby';
import globToRegExp from 'glob-to-regexp';
import { category } from './file_type';

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

export const getAsset = (library, version, file, sri) => {
    const asset = {
        library,
        version,
        file,
        sri,
        type: file.split('.').reverse()[0],
        url: `https://cdnjs.cloudflare.com/ajax/libs/${library}/${version}/${file}`,
    };
    asset.code = code(asset);
    asset.codeTitle = codeTitle(asset);
    return asset;
};

export const getAssets = (data) => {
    // Generate the categories
    const categories = new Set();
    categories.add('All');

    // Get the raw assets for this version
    const rawAssets = data.library.assets.find(a => a.version === data.version);

    // Convert them to asset objects and sort them
    const sortedAssets = rawAssets.files
        .map(asset => getAsset(
            data.library.name,
            data.version,
            asset,
            rawAssets.sri && asset in rawAssets.sri ? rawAssets.sri[asset] : null,
        ))
        .sort(
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
        const cat = category(asset.type);
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
