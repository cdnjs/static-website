import urlParse from 'url-parse';

export default (url, campaign, medium = 'link') => {
    const parsed = urlParse(url, true);
    parsed.query.utm_source = 'cdnjs';
    parsed.query.utm_medium = `cdnjs_${medium}`;
    parsed.query.utm_campaign = `cdnjs_${campaign}`;
    return parsed.toString();
}
