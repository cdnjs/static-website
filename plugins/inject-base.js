const origin = process.env.SITE_HOST ||
    (typeof (window) !== 'undefined' ? window.location.origin : '/');
const base = origin.trim().replace(/\/*$/, '') + '/';

export default function (ctx, inject) {
    inject('baseUrl', base);
}
