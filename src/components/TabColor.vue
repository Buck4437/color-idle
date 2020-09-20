<template lang="html">
  <div>
    <div>
      <div v-if="player.unlocks.colorScaling"> Your excess amount of blue divides all your color production by x{{format.num(gameData.colorScaling.effect(player), 2)}} !<br><br></div>
      <color-red                                        class="red-producer" :width="progressWidth[0]" :canGenerate="canGenerate[0]" @generate="generate"/>
      <color-green v-if="player.unlocks.color[1].color" class="green-producer" :width="progressWidth[1]" :canGenerate="canGenerate[1]" @generate="generate"/>
      <color-blue  v-if="player.unlocks.color[2].color" class="blue-producer" :width="progressWidth[2]" :canGenerate="canGenerate[2]" @generate="generate"/>
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
.red-producer, .green-producer, .blue-producer{
  width: 800px;
  border: 2px solid;
  margin-bottom: 30px;
}

</style>
