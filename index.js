import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.js';
const CanvasBuffer = Vue.extend({
    name: 'canvas-buffer',
    template: '#canvas-buffer-template',
    props: {
        label: String,
        cols: Number,
        rows: Number,
        scale: { type: Number, default: 1 },
        value: Array
    },
    data() {
        const width = this.cols * this.scale;
        const height = this.rows * this.scale;
        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', `${width}px`);
        canvas.setAttribute('height', `${height}px`);
        return {
            ctx: canvas.getContext('2d'),
            fps: [],
            last: performance.now()
        };
    },
    computed: {
        prettyFPS() {
            return (this.fps.reduce((acc, n) => acc + n, 0) / this.fps.length).toFixed(3);
        },
        buffer() {
            if (this.scale === 1)
                return this.value;
            return new Array(this.width * this.height * 4)
                .fill(undefined)
                .map((n, i) => {
                const rgbaOffset = i % 4;
                const cellIndex = Math.floor(i / 4);
                const y = Math.floor(cellIndex / this.width / this.scale);
                const x = Math.floor((cellIndex % this.width) / this.scale);
                return this.value[y * this.cols * 4 + x * 4 + rgbaOffset];
            });
        },
        style() {
            return {
                flexBasis: `${100 / this.width}%`
            };
        },
        width() {
            return this.ctx.canvas.width;
        },
        height() {
            return this.ctx.canvas.height;
        }
    },
    mounted() {
        this.$el.appendChild(this.ctx.canvas);
        window.requestAnimationFrame(this.render.bind(this));
    },
    methods: {
        render(now) {
            this.fps.push(1000 / (now - this.last));
            while (this.fps.length > 600)
                this.fps.shift();
            this.last = now;
            this.ctx.putImageData(new ImageData(new Uint8ClampedArray(this.buffer), this.width, this.height), 0, 0);
            window.requestAnimationFrame(this.render.bind(this));
        }
    }
});
new Vue({
    template: '#app-template',
    components: {
        CanvasBuffer
    },
    data() {
        const cols = 3;
        const rows = 3;
        return {
            cols, rows, scale: 4,
            buffer: new Array(cols * rows * 4).fill(undefined).map((n, i) => i % 4 === 3 ? 255 : 0)
        };
    }
}).$mount('#app');
