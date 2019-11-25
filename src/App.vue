<template>
    <div id="app">
        <form @submit.prevent>
            <fieldset>
                <legend>App Controls</legend>
                <label for="width">Width</label><input id="width" min="1" step="1" type="number" v-model.number="width">
                <label for="height">Height</label><input id="height" min="1" step="1" type="number"
                                                         v-model.number="height">
                <label for="scale">Scale</label><input id="scale" min="1" step="1" type="number" v-model.number="scale">
            </fieldset>
        </form>

        <div class="buffers">
            <buffer-grid :height="height" :width="width" label="Primary" v-model="target"/>
            <buffer-grid :height="height" :scale="scale" :width="width" label="Secondary" v-model="target"/>
        </div>
    </div>
</template>

<script>
  import Vue from 'vue'
  import BufferGrid from './BufferGrid.vue'

  export default Vue.extend({
    name: 'app',
    components: {
      'buffer-grid': BufferGrid
    },
    data () {
      return {
        width: 4,
        height: 4,
        scale: 3,
        target: undefined,
      }
    }
  })
</script>

<style scoped>
    form label {
        margin: 1em;
    }

    div.buffers {
        display: flex;
    }

    div.buffers > section {
        width: 50%;
        flex-basis: 100%;
        margin: 1em;
    }
</style>
