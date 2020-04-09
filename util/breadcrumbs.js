export default async (route, router, data) => {
    // Split the url into parts
    let breadcrumbList = route.path.split('/');

    // If the originalUrl ended with '/', pop last item, which will be empty
    if (breadcrumbList[breadcrumbList.length - 1] === '') { breadcrumbList.pop(); }

    // Generate the breadcrumbs
    breadcrumbList = await Promise.all(breadcrumbList.map(async (path, index) => {
        const nowUrl = breadcrumbList.slice(0, index + 1).join('/') || '/';

        // Get the display name of the route
        let name = 'Home';
        if (path) {
            name = path;

            // Try getting router meta data
            const match = router.getMatchedComponents(nowUrl);
            if (match.length) {
                let comp = match[0];
                // If we have don't have a Vue component, we might have an async one
                if (comp.name && comp.name !== 'VueComponent') {
                    try {
                        comp = await comp();
                    } catch (_) {
                        // Probably wasn't an async function
                    }
                }

                // Get the meta data
                let meta;
                // Component object
                if (comp.meta) {
                    meta = comp.meta;
                }
                // VueComponent
                if (comp.options && comp.options.meta) {
                    meta = comp.options.meta;
                }

                // Set the breadcrumb name, pass data if function
                name = meta.breadcrumb;
                if (typeof name === 'function') {
                    name = name(data, nowUrl);
                }
            }
        }

        // Save it
        return {
            index: name,
            url: nowUrl,
            position: index + 1,
        };
    }));

    // Mark the last item
    breadcrumbList[breadcrumbList.length - 1].last = true;
    return breadcrumbList;
};
