export default {
    browse: {
        query: [
            {
                param: 'search',
                type: 'string',
                req: false,
                desc: [
                    'The value to use when searching the libraries index on cdnjs.',
                ],
            },
            {
                param: 'fields',
                type: 'comma-separated string',
                req: false,
                desc: [
                    'Provide a comma-separated string of fields to return in each library object from the cdnjs Algolia index.',
                    '<code>name</code> and <code>latest</code> will always be present in every object. Any field requested that does not exist will be included in each object with a <code>null</code> value.',
                    'Currently, the following fields (case-sensitive) are published in the Algolia index for each library and can be requested via this parameter: <code>filename</code>, <code>description</code>, <code>version</code>, <code>keywords</code>, <code>alternativeNames</code>, <code>fileType</code>, <code>github</code>, <code>objectID</code>, <code>license</code>, <code>homepage</code>, <code>repository</code>, <code>author</code>, <code>originalName</code>, <code>sri</code>.',
                    '<small><i>The available fields are based on the <a href="https://github.com/cdnjs/tools/blob/master/cmd/algolia/main.go">SearchEntry structure in our tools repo</a>.</i></small>',
                ],
            },
            {
                param: 'output',
                type: 'string',
                req: false,
                desc: [
                    'Use the output value <code>human</code> to receive the JSON results in pretty print format, presented on a HTML page.',
                ],
            },
        ],
        response: [
            {
                prop: 'results',
                type: [
                    'array<object>',
                ],
                desc: [
                    'This property will contain an object for every library that cdnjs has available.',
                ],
            },
            {
                prop: 'results[].name',
                type: [
                    'string',
                ],
                desc: [
                    'This will be the full name of the library, as stored on cdnjs.',
                ],
            },
            {
                prop: 'results[].latest',
                type: [
                    'string',
                ],
                desc: [
                    'This will be the URL of the default file on the latest version of the library.',
                    '<small><i>It is important to note that this URL is based on the latest version number of the library and the default file name configured, there is no validation in place to ensure that this URL will actually serve a valid asset.</i></small>',
                ],
            },
            {
                prop: 'results[].filename',
                type: [
                    'optional',
                    'string',
                ],
                desc: [
                    'The will be the name of the default file for the library.',
                    '<small><i>There is no validation that this file actually exists in each version of the library.</i></small>',
                ],
            },
            {
                prop: 'results[].description',
                type: [
                    'optional',
                    'string',
                ],
                desc: [
                    'The description of the library if it has been provided in the cdnjs package.json file.',
                ],
            },
            {
                prop: 'results[].version',
                type: [
                    'optional',
                    'string',
                ],
                desc: [
                    'The latest version of the library that is available on cdnjs.',
                ],
            },
            {
                prop: 'results[].keywords',
                type: [
                    'optional',
                    'array<string>',
                ],
                desc: [
                    'An array of keywords provided in the cdnjs package.json for the library.',
                ],
            },
            {
                prop: 'results[].alternativeNames',
                type: [
                    'optional',
                    'array<string>',
                ],
                desc: [
                    'An array of other names that might be used for the library. These cannot be substituted for the actual library name when navigating the cdnjs API and website.',
                ],
            },
            {
                prop: 'results[].fileType',
                type: [
                    'optional',
                    'string',
                ],
                desc: [
                    'The file type (extension) for the default file defined for the library in the cdnjs package.json.',
                ],
            },
            {
                prop: 'results[].github',
                type: [
                    'optional',
                    'object',
                ],
                desc: [
                    'Some meta data from the relevant GitHub repository for the library, if available and configured in the cdnjs package.json for the library.',
                ],
            },
            {
                prop: 'results[].github.user',
                type: [
                    'optional',
                    'string',
                ],
                desc: [
                    'The username or organisation name for the repository on GitHub.',
                ],
            },
            {
                prop: 'results[].github.repo',
                type: [
                    'optional',
                    'string',
                ],
                desc: [
                    'The name of the repository on GitHub.',
                    '<small><i>The full repository name can be constructed in the form <code>user/repo</code>.</i></small>',
                ],
            },
            {
                prop: 'results[].github.stargazers_count',
                type: [
                    'optional',
                    'integer',
                ],
                desc: [
                    'The number of stars that the repository has on GitHub.',
                ],
            },
            {
                prop: 'results[].github.forks',
                type: [
                    'optional',
                    'integer',
                ],
                desc: [
                    'The number of forks the repository currently has (at time of indexing) on GitHub.',
                ],
            },
            {
                prop: 'results[].github.subscribers_count',
                type: [
                    'optional',
                    'integer',
                ],
                desc: [
                    'The number of users on GitHub who are watching the repository.',
                ],
            },
            {
                prop: 'results[].objectID',
                type: [
                    'optional',
                    'string',
                ],
                desc: [
                    'The ID used internally within Algolia to track this entry, this will be the name of the library as seen on cdnjs.',
                ],
            },
            {
                prop: 'results[].license',
                type: [
                    'optional',
                    'string',
                ],
                desc: [
                    'The license defined for the library on cdnjs, as a string. If the library has a custom license, it may not be shown here.',
                ],
            },
            {
                prop: 'results[].homepage',
                type: [
                    'optional',
                    'string',
                ],
                desc: [
                    'A link to the homepage of the package, if one is defined in the cdnjs package.json file. Normally, this is either the package repository or the package website.',
                ],
            },
            {
                prop: 'results[].repository',
                type: [
                    'optional',
                    'object',
                ],
                desc: [
                    'The repository for the library, if known, in standard repository format.',
                ],
            },
            {
                prop: 'results[].repository.type',
                type: [
                    'optional',
                    'string',
                ],
                desc: [
                    'The type of repository for the library, normally <code>git</code>.',
                ],
            },
            {
                prop: 'results[].repository.url',
                type: [
                    'optional',
                    'string',
                ],
                desc: [
                    'The url for repository associated with the library, if provided in the library\'s cdnjs package.json file.',
                ],
            },
            {
                prop: 'results[].author',
                type: [
                    'optional',
                    'string',
                ],
                desc: [
                    'The attributed author for the library, as defined in the cdnjs package.json file for this library.',
                ],
            },
            {
                prop: 'results[].originalName',
                type: [
                    'optional',
                    'string',
                ],
                desc: [
                    'If the library on cdnjs was every renamed, this value will contain the original name for this library. If it hasn\'t been renamed, this value will match the current name.',
                ],
            },
            {
                prop: 'results[].sri',
                type: [
                    'optional',
                    'string',
                ],
                desc: [
                    'The SRI hash value for the file provided in the <code>latest</code> property, if it exists and is valid (i.e. if the SRI hash could be calculated for it).',
                ],
            },
            {
                prop: 'total',
                type: [
                    'integer',
                ],
                desc: [
                    'The total number of libraries returned in the request.',
                ],
            },
        ],
    },
    library: {
        query: [
            {
                param: 'fields',
                type: 'comma-separated string',
                req: false,
                desc: [
                    'Provide a comma-separated string of fields to return in the library object.',
                    'The fields available here are based on the fields in each library\'s package.json file and are not guaranteed.',
                ],
            },
            {
                param: 'output',
                type: 'string',
                req: false,
                desc: [
                    'Use the output value <code>human</code> to receive the JSON results in pretty print format, presented on a HTML page.',
                ],
            },
        ],
        response: [],
    },
};
