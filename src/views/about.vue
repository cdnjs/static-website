<template>
    <section>
        <header>
            <Breadcrumbs></Breadcrumbs>
        </header>
        <div class="content">
            <div class="left">
                <div class="who-we-are">
                    <h1>Who are we?</h1>
                    <p>
                        We are cdnjs, the #1 free and open source CDN built to make life easier for developers
                        serving <a href="https://w3techs.com/technologies/details/cd-cdnjs/all/all">over 10.4% of
                        all websites</a>.
                    </p>
                    <p>
                        We believe in the open-source mission, and want to support a fast and free web. To do that,
                        we’ve built our service to be free, public, and developer/web friendly since 2011.
                        We handle over 150 billion requests a month and support http2.0/http/https/spdy, but
                        recommend https!
                    </p>
                    <p>
                        While a CDN isn’t perfect for every occasion, when it is we’re here for you.
                    </p>
                </div>

                <div class="contribute-legal">
                    <h1>Contribute</h1>
                    <p>
                        As a public OSS project, cdnjs relies on contributions and donations from the community.
                        You can get get involved on <a href="https://github.com/cdnjs">GitHub</a> or find out more about
                        <router-link :to="{ name: 'sponsor-us' }">donating here</router-link>.
                    </p>

                    <h1>Legal</h1>
                    <p>
                        As a large community-oriented open-source project,
                        legal policy has to be at the forefront of our mind.
                    </p>
                    <p>
                        As Cloudflare provides the core cdnjs service, please take a read of
                        <a href="https://www.cloudflare.com/privacypolicy/">their policies</a>.
                    </p>
                </div>

                <div class="members">
                    <h2>Members</h2>
                    <div class="member-blocks">
                        <div class="member">
                            <a href="https://github.com/ryankirkman">
                                <img src="../assets/members/ryankirkman.jpg" alt="ryankirkman" />
                            </a>
                            <div class="info">
                                <p class="name">Ryan Kirkman</p>
                                <p class="role">
                                    Founder
                                    <a href="https://twitter.com/ryan_kirkman">
                                        <i class="fab fa-twitter"></i>
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div class="member">
                            <a href="https://github.com/thomasdavis">
                                <img src="../assets/members/thomasdavis.jpg" alt="thomasdavis" />
                            </a>
                            <div class="info">
                                <p class="name">Thomas Davis</p>
                                <p class="role">
                                    Founder
                                    <a href="https://twitter.com/ajaxdavis">
                                        <i class="fab fa-twitter"></i>
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div class="member">
                            <a href="https://github.com/MattIPv4">
                                <img src="../assets/members/mattcowley.jpg" alt="MattIPv4" />
                            </a>
                            <div class="info">
                                <p class="name">Matt Cowley</p>
                                <p class="role">
                                    Community Manager
                                    <a href="https://twitter.com/MattIPv4">
                                        <i class="fab fa-twitter"></i>
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div class="member">
                            <a href="https://github.com/xtuc">
                                <img src="../assets/members/svensauleau.jpg" alt="xtuc" />
                            </a>
                            <div class="info">
                                <p class="name">Sven Sauleau</p>
                                <p class="role">
                                    Maintainer (Cloudflare)
                                    <a href="https://twitter.com/svensauleau">
                                        <i class="fab fa-twitter"></i>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="sponsors">
                <h1>Sponsors</h1>
                <div class="sponsor-blocks">
                    <div class="sponsor cloudflare">
                        <a>
                            <img src="../assets/sponsors/cloudflare.svg" alt="Cloudflare" />
                            <div><p>Hello there</p></div>
                        </a>
                    </div>
                    <div class="sponsor">
                        <a>
                            <img src="../assets/sponsors/algolia.svg" alt="Algolia" />
                            <div><p>Hello there</p></div>
                        </a>
                    </div>
                    <div class="sponsor">
                        <a>
                            <img src="../assets/sponsors/digitalocean.svg" alt="DigialOcean" />
                            <div><p>Hello there</p></div>
                        </a>
                    </div>
                    <div class="sponsor">
                        <a>
                            <img src="../assets/sponsors/heroku.svg" alt="Heroku" />
                            <div><p>Hello there</p></div>
                        </a>
                    </div>
                    <div class="sponsor">
                        <a>
                            <img src="../assets/sponsors/statuspage.svg" alt="Statuspage" />
                            <div><p>Hello there</p></div>
                        </a>
                    </div>
                    <div class="sponsor">
                        <a>
                            <img src="../assets/sponsors/cloudflare.svg" alt="Discourse" />
                            <div><p>Hello there</p></div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    const Breadcrumbs = require('../components/breadcrumbs');

    module.exports = {
        name: 'About',
        components: {
            Breadcrumbs,
        },
    };
</script>
