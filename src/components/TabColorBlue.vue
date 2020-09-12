<template lang="html">
  <div>
    <color-adder :width="width" :canGenerate="canGenerate" @generate="generate"/>
    <div v-if="player.unlocks.color[2].upgrade" class="coll-button-blue" @click="collapse"/>
    <div v-if="player.unlocks.color[2].upgrade" class="coll-container-blue">
      <color-effect class="color-effect-container"/>
      <color-upg class="color-upgrade-container"/>
    </div>
  </div>
</template>

<script>
import colorAdder from './TabColorBlueAdder'
import colorEffect from './TabColorBlueEffect'
import colorUpg from './TabColorBlueUpg'

export default {
  props:{
    width: String,
    canGenerate: [Boolean, String]
  },
  components:{
    colorAdder,
    colorEffect,
    colorUpg
  },
  methods:{
    generate(){
      this.$emit('generate', 2)
    },
    collapse(){
      let sels = document.getElementsByClassName("coll-button-blue")
      for (let el of sels){
        el.classList.toggle("coll-active-blue");
      }
      let iels = document.getElementsByClassName("coll-container-blue")
      for (let el of iels){
        if (el.style.maxHeight){
          el.style.maxHeight = null;
        } else {
          el.style.maxHeight = el.scrollHeight + "px";
        }
      }
    },
  }
}
</script>

<style lang="css" scoped>
.coll-button-blue{
  cursor: pointer;
  padding: 0 5px;
  height: 20px;
  border-top: 2px solid var(--border-color);
  border-bottom: 2px solid var(--border-color);
  transition-duration: 0.2s;
}

.coll-button-blue:hover{
  background-color: var(--background-color-enabled--hover);
}

.coll-button-blue:after{
  float: right;
  content: "\25bc"; /* unicode char for down arrow */
}

.coll-active-blue:after{
  float: right;
  content: "\25b2"; /* unicode char for up arrow */
}

.coll-container-blue{
  padding: 0 10px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}

.color-effect-container{
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  height: 25px;
  margin: 10px;
  padding: 10px;
}

.color-upgrade-container{
  display: flex;
  padding: 10px;
  justify-content: space-between;
}
</style>
