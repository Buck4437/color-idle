<template lang="html">
  <div>
    <div >
      <color-red                                        class="color-producer" :width="progressWidth[0]" :canGenerate="canGenerate[0]" @generate="generate"/>
      <color-green v-if="player.unlocks.color[1].color" class="color-producer" :width="progressWidth[1]" :canGenerate="canGenerate[1]" @generate="generate"/>
      <color-blue  v-if="player.unlocks.color[2].color" class="color-producer" :width="progressWidth[2]" :canGenerate="canGenerate[2]" @generate="generate"/>
    </div>
  </div>
</template>

<script>
import colorRed from './TabColorRed.vue'
import colorGreen from './TabColorGreen.vue'
import colorBlue from './TabColorBlue.vue'

export default {
  components: {
    colorRed,
    colorGreen,
    colorBlue
  },
  props:{
    canGenerate: Array,
  },
  computed:{
    progressWidth(){
      let array = []
      for (let i = 0; i <= 2; i++){
        let t = this.player.color[i].timer.toNumber()
        array.push((1-t-Math.floor(1-t))*100 + '%')
      }
      return array
    }
  },
  methods:{
    generate(id){
      this.$emit('generate', id)
    }
  }
}
</script>

<style lang="css" scoped>
.color-producer {
  width: 800px;
  border: 2px solid;
  margin-bottom: 50px;
}
</style>
