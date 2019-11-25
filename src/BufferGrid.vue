<template>
    <section>
        <h1 v-if="label" v-text="label"></h1>
        <div class="grid">
            <div :class="{cell: true, active: active.includes(i - 1)}" :key="i" :style="{flexBasis}"
                 @mouseenter="() => onTarget(i - 1)" v-for="i in length"></div>
        </div>
        <pre v-text="active.join(', ')"></pre>
    </section>
</template>

<script>
  import Vue from 'vue'

  export default Vue.extend({
    name: 'buffer-grid',
    props: {
      value: Number,
      label: String,
      width: { type: Number, required: true },
      height: { type: Number, required: true },
      scale: {
        type: Number,
        default: 1
      }
    },
    computed: {
      length () {
        return this.adjustedWidth * this.adjustedHeight
      },
      flexBasis () {
        return `${100 / this.adjustedWidth}%`
      },
      active () {
        let active = []

        const x = (this.value % this.width) * this.scale
        const y = Math.floor(this.value / this.width) * this.scale
        const o = y * this.adjustedWidth + x

        for (let j = 0; j < this.scale; j++) {
          for (let i = 0; i < this.scale; i++) {
            active.push(o + i + j * this.width * this.scale)
          }
        }

        return active.sort((a, b) => a - b)
      },
      adjustedWidth () {
        return this.width * this.scale
      },
      adjustedHeight () {
        return this.height * this.scale
      }
    },
    methods: {
      onTarget (i) {
        const x = Math.floor((i % this.adjustedWidth) / this.scale)
        const y = Math.floor(Math.floor(i / this.adjustedWidth) / this.scale)
        this.$emit('input', y * this.width + x)
      }
    }
  })
</script>

<style scoped>
    h1 {
        width: 100%;
        text-align: center;
    }

    div.grid {
        display: flex;
        flex-wrap: wrap;
    }

    .active {
        background-color: red;
    }

    div.cell {
        display: flex;
        justify-content: center;
        align-items: center;
        outline: 1px solid black;
        min-width: 25px;
        min-height: 25px;
    }
</style>
