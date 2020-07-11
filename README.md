<h1 align="center">
    <a href="https://cdnjs.com"><img src="https://raw.githubusercontent.com/cdnjs/brand/master/logo/standard/dark-512.png" width="175px" alt="< cdnjs >"></a>
</h1>

<h3 align="center">The #1 free and open source CDN built to make life easier for developers.</h3>

---

## cdnjs Website

Welcome to the cdnjs/static-website repository, the home of the new cdnjs website built with Vue &
Nuxt, following the new cdnjs branding proposal from [cdnjs/brand](https://github.com/cdnjs/brand).

This website relies completely on the cdnjs API to operate, resulting in very low resource usage to
serve the site and limited app logic to update data being used (only sitemaps have to be updated,
everything else uses API calls when a page is loaded).

## Getting Started

This project runs on [Node.js](https://nodejs.org). Please make sure you have a version installed
that matches our defined requirement in the [.nvmrc](.nvmrc) file for this project.

Included with this project is a dependency lock file. This is used to ensure that all installations
of the project are using the same version of dependencies for consistency.

You can install the Node dependencies following this lock file by running:

```shell script
npm ci
```

Once the dependencies are installed, the website is ready to run in development mode. To start Nuxt
in development mode (without a custom server), run:

```shell script
npm run dev
```

## Analyzing Bundle

The website is build using Nuxt and relies on Webpack to generate the client-side bundle used to
render the site and provide interactivity. Due to this, we can use Webpack's analyzer to better
understand what is contributing to the size of the final bundle.

To run the analyzer, use the following package script:

```shell script
npm run dev:analyze
```

## Production Deployment

To deploy this website to production, the following steps should be taken:

- Install dependencies with `npm ci`
- Build the site for production with `npm run build`
- Start the custom Express server with `npm run start`

For deployments to Heroku, the installation of dependencies and building the app will automatically
be done, with `npm run start` being defined in the [`Procfile`](Procfile).

To change the port that the app binds to, set the `PORT` environment var when running the script.
For our Heroku deployment, this is set automatically by Heroku.

The custom Express server is used to handle our sitemaps, as we have too many routes for Nuxt's
sitemap offering to handle reliably. During the build step (`npm run build`) initial sitemaps will
be generated. The Express server will then regenerate these every 30 minutes using the cdnjs API. A
log containing the outcome of the last generation in Express is available at `/sitemap-log.txt` on
the website.

## Linting

Our full set of tests for linting can be run at any time with:

```shell script
npm test
```

Included in this repository are an [eslint config file](.eslintrc.js) as well as a
[sass-lint config file](.sasslintrc) to help with ensuring a consistent style in the codebase for
the JS/Vue and SCSS used in the app.

To help enforce this, we use both eslint and sass-lint in our testing. To run eslint at any time,
which checks the code style of any JavaScript and Vue files, you can use:

```shell script
npm run test:eslint
```

eslint also provides automatic fixing capabilities, these can be run against the codebase with:

```shell script
npm run test:eslint:fix
```

Similarly, sass-lint can be run at any time to check the quality of all the SCSS files used in the
app, by running:

```shell script
npm run test:scss
```

A secondary package, sass-lint-auto-fix, is available to help with automatically fixing some of the
errors raised by sass-lint, which can be run with:

```shell script
npm run test:scss:fix
```

Like with `npm test`, which runs both eslint & sass-lint, a shorter package script is available to
automatically attempt to fix issues from both linting packages, which can be used by running:

```shell script
npm run test:fix
```
