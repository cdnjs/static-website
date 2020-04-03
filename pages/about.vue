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
                        serving
                        <a :href="utm('https://w3techs.com/technologies/details/cd-cdnjs/all/all', 'about')">
                            over 10.4% of all websites</a>.
                    </p>
                    <p>
                        We believe in the open-source mission, and want to support a fast and free web. To do that,
                        we’ve built our service to be free, public, and developer/web friendly since 2011.
                        We handle <a :href="utm('https://github.com/cdnjs/cf-stats', 'about')">over
                            170 billion requests a month</a> and support HTTP/3, HTTP/2, QUIC, SPDY, HSTS & HTTPS!
                    </p>
                    <p>
                        While a CDN isn’t perfect for every occasion, when it is we’re here for you.
                    </p>
                    <p>
                        <nuxt-link :to="{ name: 'libraries' }" class="button">
                            View our libraries
                        </nuxt-link>
                        <a :href="utm('https://github.com/cdnjs', 'about')" class="button">
                            We're on GitHub
                        </a>
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
                        You can get get involved on
                        <a :href="utm('https://github.com/cdnjs', 'about')">GitHub</a> or find out more
                        about <nuxt-link :to="{ name: 'sponsor' }">
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
                        <a :href="utm('https://www.cloudflare.com/privacypolicy/', 'about')">
                            their privacy policy</a>.
                    </p>
                </div>

                <div class="members">
                    <h2>Members</h2>
                    <div class="member-blocks">
                        <div v-for="member in members" class="member">
                            <a :href="utm(`https://github.com/${member.github}`, 'about')">
                                <img :src="require(`../assets/img/members/${member.image}`)" :alt="member.github" />
                            </a>
                            <div class="info">
                                <p class="name">
                                    {{ member.name }}
                                </p>
                                <p class="role">
                                    {{ member.role }}
                                    <a v-if="member.twitter"
                                       :href="utm(`https://twitter.com/${member.twitter}`, 'about')"
                                    >
                                        <i class="fab fa-twitter"></i>
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div class="member you">
                            <a :href="utm('https://github.com/cdnjs', 'about')">
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
                        <a :href="utm(sponsor.site, 'about')">
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
                        <p><a href="">Contact Us</a></p> <!-- FIXME -->
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
    import utm from '../util/utm';
    import members from '../data/members';
    import sponsors from '../data/sponsors';

    const meta = {
        title: 'About Us',
        breadcrumb: 'About Us',
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
                members,
                sponsors,
            };
        },
        async asyncData (data) {
            return {
                crumbs: await breadcrumbs(data.route, data.app.router, {}),
            };
        },
        methods: {
            utm,
        },
    };
</script>
