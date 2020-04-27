<template>
    <div class="animated-background">
        <!-- eslint-disable-next-line vue/attribute-hyphenation -->
        <Background ref="background" width="100%" height="100%" preserveAspectRatio="xMidYMin slice"></Background>
    </div>
</template>

<script>
    import Background from '../assets/img/bg.svg?inline';

    export default {
        name: 'AnimatedBackground',
        components: {
            Background,
        },
        data () {
            return {
                pre: {},
                preSpeed: 5,
                post: {},
                postSpeed: 3,
            };
        },
        mounted () {
            // Convert polylines to paths
            this.$refs.background.querySelectorAll('#Pre-cloud-tracks polyline').forEach(this.convertPolyToPath);
            this.$refs.background.querySelectorAll('#Post-cloud-tracks polyline').forEach(this.convertPolyToPath);

            // Collate all the paths
            this.$refs.background.querySelectorAll('#Pre-cloud-tracks path').forEach((elm, index) => {
                const id = `PreCloudTracks${index}`;
                elm.setAttribute('id', id);
                this.$data.pre[id] = 0;
            });
            this.$refs.background.querySelectorAll('#Post-cloud-tracks path').forEach((elm, index) => {
                const id = `PostCloudTracks${index}`;
                elm.setAttribute('id', id);
                this.$data.post[id] = 0;
            });

            // Do the origin feeds
            Object.keys(this.$data.pre).forEach((id) => {
                const path = this.$refs.background.querySelector(`#${id}`);
                this.create(path, 0, this.$data.preSpeed,
                            () => Math.random() * 3 - 1, d => d * 2 * Math.random());
            });

            // Do the edge feeds
            Object.keys(this.$data.post).forEach((id) => {
                const path = this.$refs.background.querySelector(`#${id}`);
                const pathIndex = Number(id.match(/^.+(\d+)/)[1]);
                const dots = 6 - pathIndex;
                for (let i = 0; i < dots; i++) {
                    this.create(path, i, this.$data.postSpeed, () => -i / dots, d => pathIndex < 2 ? 0 : d);
                }
            });
        },
        methods: {
            convertPolyToPath (poly) {
                const points = poly.getAttribute('points').split(/\s+|,/);
                const x0 = points.shift(); const y0 = points.shift();
                const lines = points.map((point, index) => `${index % 2 === 0 ? 'L ' : ''}${point}`).join(' ');
                const pathData = 'M ' + x0 + ' ' + y0 + ' ' + lines;

                const svgNS = poly.ownerSVGElement.namespaceURI;
                const path = document.createElementNS(svgNS, 'path');
                path.setAttribute('id', poly.getAttribute('id'));
                path.setAttribute('fill', poly.getAttribute('fill') || 'transparent');
                path.setAttribute('stroke', poly.getAttribute('stroke') || 'none');
                path.setAttribute('d', pathData);

                poly.parentElement.replaceChild(path, poly);
            },
            create (path, index, speed, initial, repeat) {
                const svgNS = path.ownerSVGElement.namespaceURI;
                const duration = path.getTotalLength() / 1000 * speed;

                const circle = document.createElementNS(svgNS, 'circle');
                circle.setAttribute('cx', '');
                circle.setAttribute('cy', '');
                circle.setAttribute('r', '5');
                circle.setAttribute('fill', '#d9643a');
                circle.setAttribute('transform', path.parentElement.getAttribute('transform'));

                const motion = document.createElementNS(svgNS, 'animateMotion');
                motion.setAttribute('id', `${path.getAttribute('id')}Anim${index}`);
                motion.setAttribute('dur', `${duration}s`);
                motion.setAttribute('begin', `${initial(duration)}s;${path.getAttribute('id')}Anim${index}.end+${repeat(duration)}s`);
                motion.setAttribute('path', path.getAttribute('d'));
                circle.appendChild(motion);

                path.parentElement.parentElement.appendChild(circle);
            },
        },
    };
</script>
