<template lang="html">
  <div>
    <color-adder :width="width" :canGenerate="canGenerate" @generate="generate"/>
    <div v-if="player.unlocks.color[0].upgrade" class="coll-button-red" @click="collapse"/>
    <div class="coll-container-red">
      <color-upg class="color-upgrade-container"/>
    </div>
  </div>
</template>

<script>
import colorAdder from './TabColorRedAdder'
import colorUpg from './TabColorRedUpg'
export default {
  props:{
    width: String,
    canGenerate: [Boolean, String]
  },
  components:{
    colorAdder,
    colorUpg
  },
  methods:{
    generate(){
      this.$emit('generate', 0)
    },
    collapse(){
      let sels = document.getElementsByClassName("coll-button-red")
      for (let el of sels){
        el.classList.toggle("coll-active-red");
      }
      let iels = document.getElementsByClassName("coll-container-red")
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
.coll-button-red{
  cursor: pointer;
  padding: 0 5px;
  height: 20px;
  border-top: 2px solid var(--border-color);
  border-bottom: 2px solid var(--border-color);
  transition-duration: 0.2s;
}

.coll-button-red:after{
  float: right;
  content: "\25bc"; /* unicode char for down arrow */
}

.coll-active-red:after{
  float: right;
  content: "\25b2"; /* unicode char for up arrow */
}

.coll-container-red{
  padding: 0 10px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}
.color-upgrade-container{
  display: flex;
  padding: 10px;
  justify-content: space-between;
}
</style>
