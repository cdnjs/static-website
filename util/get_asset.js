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

export default (library, version, file, sri) => {
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
