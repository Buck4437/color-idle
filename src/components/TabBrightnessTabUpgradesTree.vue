<template lang="html">
  <div style="position: relative; width: 800px;">
    <button v-for="node in nodes" :key="node.id" class="nodes" :class="'nodes--' + (node.state !== undefined ? node.state(player) : 'default')" :style="{'left': (node.pos[0]*720)+'px', 'top': node.pos[1]+'px'}" @click="buyNode(node.id)">
        <div class="text">{{node.name}}</div>
        <div class="tooltip">
          <div class="tooltiptext" v-html="node.desc(player)"></div>
        </div>
    </button>
    <canvas id='brightnessUpg-canvas' width="800" :height="canvasHeight" style="z-layer: -1">
    </canvas>
  </div>
</template>

<script>
export default {
  props:{
    nodes: Array,
  },
  computed:{
    canvasHeight(){
      let highest = 300
      for (let node of this.nodes){
        if (node.pos[1] > highest-300) highest = node.pos[1]+300
      }
      return highest
    }
  },
  methods:{
    buyNode(id){
      this.$emit('select-node', id)
    },
    findNode(id){
      for (let node of this.nodes){
        if (node.id == id) return node
      }
      return
    }
  },
  mounted(){
    this.render()
  },
}
</script>

<style lang="css" scoped>
.nodes{
  width: 80px;
  height: 80px;
  font-size: 15px;
  border-radius: 50%;
  position: absolute;
}

.nodes--locked{
  border-color: var(--border-color-locked);
  background-color: var(--background-color);
}

.nodes--locked .text{
  color: var(--color-locked);
}

.nodes--locked:hover{
  background-color: var(--background-color);
}

.nodes--disabled{
  border-color: var(--border-color-disabled);
  background-color: var(--background-color-disabled);
}

.nodes--disabled:hover{
  background-color: var(--background-color-disabled);
}

.nodes--bought{
  border-color: var(--border-color-enabled);
  background-color: var(--background-color);
}

.nodes--bought:hover{
  background-color: var(--background-color);
}

.tooltip {
  visibility: hidden;
  border: 2px solid var(--border-color);
  background-color: var(--background-color);
  color: var(--color);
  text-align: center;
  border-radius: 6px;
  padding: 10px 10px;
  width: 250px;

  /* Position the tooltip */
  position: absolute;
  z-index: 2;
  bottom: 125%;
  left: 50%;
  margin-left: -125px;
}

.tooltip .tooltiptext::after {
  content: " ";
  position: absolute;
  top: 100%; /* At the bottom of the tooltip */
  left: 115px;
  border-width: 10px;
  border-style: solid;
  border-color: var(--border-color) transparent transparent transparent;
}

.nodes:hover .tooltip {
  visibility: visible;
}
</style>
