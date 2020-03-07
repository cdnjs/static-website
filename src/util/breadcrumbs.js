module.exports = context => {
    // Split the url into parts
    let breadcrumbList = context.$route.path.split('/');

    // If the originalUrl ended with '/', pop last item, which will be empty
    if (breadcrumbList[breadcrumbList.length - 1] === '') breadcrumbList.pop();

    // Generate the breadcrumbs
    const lastIndex = breadcrumbList.length - 1;
    let nowUrl = '';
    let position;
    breadcrumbList = breadcrumbList.map(path => {
        position = breadcrumbList.indexOf(path);
        nowUrl += path + (position === lastIndex ? '' : '/'); // don't append / to last item

        // Get the display name of the route
        let name = 'Home';
        if (path) {
            name = path;

            // Try getting router meta data
            const match = context.$router.matcher.match(nowUrl);
            if (match && match.meta && match.meta.breadcrumb) {
                name = match.meta.breadcrumb;
                if (typeof name === 'function') name = name(context);
            }
        }

        // Save it
        return {
            index: name,
            url: nowUrl,
            position: position + 1,
        };
    });

    // Mark the last item
    breadcrumbList[lastIndex].last = true;
    return breadcrumbList;
};
