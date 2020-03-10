/* eslint-disable key-spacing */
export const typeMap = {
    js:     'js',
    map:    'map',

    css:    'css',
    scss:   'css',

    png:    'image',
    gif:    'image',
    jpg:    'image',
    jpeg:   'image',
    svg:    'image',
    webp:   'image',
    cur:    'image',

    ttf:    'font',
    eot:    'font',
    woff:   'font',
    woff2:  'font',
    otf:    'font',

    aac:    'audio',
    mp3:    'audio',
    ogg:    'audio',

    swf:    'flash',
    json:   'json',
};
/* eslint-enable key-spacing */

export const whitelist = Object.keys(typeMap);
export const categories = [...new Set(Object.values(typeMap))];

export const category = ext => typeMap[ext] || 'other';

export const isWhitelisted = ext => whitelist.includes(ext);
