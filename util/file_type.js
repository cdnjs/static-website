/* eslint-disable key-spacing */
export const typeMap = {
    js:     'JavaScript',
    ts:     'TypeScript',
    wasm:   'WebAssembly',
    hpb:    'Binary Hyphenation Patterns',
    map:    'Source Maps',
    swf:    'Flash',
    json:   'JSON',

    css:    'Styling',
    scss:   'Styling',

    png:    'Images',
    gif:    'Images',
    jpg:    'Images',
    jpeg:   'Images',
    svg:    'Images',
    webp:   'Images',
    cur:    'Images',

    ttf:    'Fonts',
    eot:    'Fonts',
    woff:   'Fonts',
    woff2:  'Fonts',
    otf:    'Fonts',

    aac:    'Audio',
    mp3:    'Audio',
    ogg:    'Audio',
};
/* eslint-enable key-spacing */

export const whitelist = Object.keys(typeMap);
export const categories = [...new Set(Object.values(typeMap))];

export const category = ext => typeMap[ext] || 'other';

export const isWhitelisted = ext => whitelist.includes(ext);
