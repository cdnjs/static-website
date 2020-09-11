const origin = process.env.SITE_HOST ||
    (typeof (window) !== 'undefined' ? window.location.origin : '/');
const base = origin + (origin.endsWith('/') ? '' : '/');

export default function (ctx, inject) {
    inject('base', base);
}
