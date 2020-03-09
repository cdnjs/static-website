export const defaultTitle = 'cdnjs - The #1 free and open source CDN built to make life easier for developers';
export const defaultDesc = 'Simple. Fast. Reliable. Content delivery at its finest. cdnjs is a web CDN service, trusted by over 985,000,000 websites, working to make it faster and easier to load library files to your websites.';

export default (title, desc) => {
    const pageTitle = `${title}${title ? ' - ' : ''}${defaultTitle}`;
    const pageDesc = `${desc}${defaultDesc}`;

    // Set title
    document.title = pageTitle;
    return;

    // Set generic
    document.head.querySelector('meta[name="title"]').setAttribute('content', pageTitle);
    document.head.querySelector('meta[name="description"]').setAttribute('content', pageDesc);

    // Set Twitter
    document.head.querySelector('meta[name="twitter:title"]').setAttribute('content', pageTitle);
    document.head.querySelector('meta[name="twitter:description"]').setAttribute('content', pageDesc);

    // Set OpenGraph
    document.head.querySelector('meta[property="og:title"]').setAttribute('content', pageTitle);
    document.head.querySelector('meta[property="og:description"]').setAttribute('content', pageDesc);
};
