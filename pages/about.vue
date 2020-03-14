<template>
    <section>
        <header>
            <Breadcrumbs :crumbs="crumbs"></Breadcrumbs>
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
                        We handle <a href="https://github.com/cdnjs/cf-stats">over 170 billion requests a month</a> and
                        support HTTP/3, HTTP/2, QUIC, SPDY, HSTS & HTTPS!
                    </p>
                    <p>
                        While a CDN isn’t perfect for every occasion, when it is we’re here for you.
                    </p>
                    <p>
                        <nuxt-link :to="{ name: 'libraries' }" class="button">
                            View our libraries
                        </nuxt-link>
                        <a href="https://github.com/cdnjs" class="button">We're on GitHub</a>
                    </p>
                    <p>
                        <small>
                            <sup>*</sup> 985,000,000 websites using cdnjs is based on a 1% sample of 9,859,171 unique
                            subdomains that made requests (based on the Referer header) to
                            cdnjs.cloudflare.com during February 2020.
                        </small>
                    </p>
                </div>

                <div class="contribute-legal">
                    <h1>Contribute</h1>
                    <p>
                        As a public OSS project, cdnjs relies on contributions and donations from the community.
                        You can get get involved on <a href="https://github.com/cdnjs">GitHub</a> or find out more about
                        <nuxt-link :to="{ name: 'sponsor-us' }">
                            donating here
                        </nuxt-link>.
                    </p>

                    <h1>Legal</h1>
                    <p>
                        As a large community-oriented open-source project,
                        legal policy has to be at the forefront of our mind.
                    </p>
                    <p>
                        As Cloudflare provides the core cdnjs service, please take a read of
                        <a href="https://www.cloudflare.com/privacypolicy/">their privacy policy</a>.
                    </p>
                </div>

                <div class="members">
                    <h2>Members</h2>
                    <div class="member-blocks">
                        <div class="member">
                            <a href="https://github.com/ryankirkman">
                                <img src="../assets/img/members/ryankirkman.jpg" alt="ryankirkman" />
                            </a>
                            <div class="info">
                                <p class="name">
                                    Ryan Kirkman
                                </p>
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
                                <img src="../assets/img/members/thomasdavis.jpg" alt="thomasdavis" />
                            </a>
                            <div class="info">
                                <p class="name">
                                    Thomas Davis
                                </p>
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
                                <img src="../assets/img/members/mattcowley.jpg" alt="MattIPv4" />
                            </a>
                            <div class="info">
                                <p class="name">
                                    Matt Cowley
                                </p>
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
                                <img src="../assets/img/members/svensauleau.jpg" alt="xtuc" />
                            </a>
                            <div class="info">
                                <p class="name">
                                    Sven Sauleau
                                </p>
                                <p class="role">
                                    Maintainer (Cloudflare)
                                    <a href="https://twitter.com/svensauleau">
                                        <i class="fab fa-twitter"></i>
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div class="member you">
                            <a href="https://github.com/cdnjs">
                                <i class="fab fa-github"></i>
                            </a>
                            <div class="info">
                                <p class="name">
                                    You?
                                </p>
                                <p class="role">
                                    Contributor
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="sponsors">
                <h1>Sponsors</h1>
                <div v-for="group in sponsors" class="sponsor-blocks">
                    <div v-for="sponsor in group"
                         :class="`sponsor ${sponsor.text}${sponsor.words ? ' words' : ''}`"
                         :style="{ background: sponsor.color }"
                    >
                        <a :href="`${sponsor.site}?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs_about`">
                            <img :src="require(`../assets/img/sponsors/${sponsor.image}`)" :alt="sponsor.name" />
                            <div>
                                <p>
                                    {{ sponsor.words }}
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="sponsor-blocks">
                    <div class="sponsor contact">
                        <h3>Want to become a Sponsor?</h3>
                        <p><a href="">Contact Us</a></p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Breadcrumbs from '../components/breadcrumbs';
    import breadcrumbs from '../util/breadcrumbs';
    import setMeta from '../util/set_meta';
    import sponsors from '../util/sponsors';

    const meta = {
        title: 'About',
        breadcrumb: 'About',
        classes: [],
    };

    export default {
        name: 'About',
        meta,
        head () {
            return setMeta(meta, this);
        },
        components: {
            Breadcrumbs,
        },
        data () {
            return {
                sponsors,
            };
        },
        async asyncData (data) {
            return {
                crumbs: await breadcrumbs(data.route, data.app.router, {}),
            };
        },
    };
</script>
