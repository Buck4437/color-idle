<template lang="html">
  <div style="position: relative; width: 800px;">
    <button v-for="node in nodes" :key="node.id" class="nodes" :style="{'left': (node.pos[0]*720)+'px', 'top': node.pos[1]+'px'}" @click="buyNode(node.id)">
        <div>{{node.name}}</div>
        <div class="tooltip">
          <div class="tooltiptext" v-html="node.desc(player)"></div>
        </div>
    </button>
    <canvas :id="id + '-node-tree-canvas'">
    </canvas>
  </div>
</template>

<script>
export default {
  props:{
    nodes: Array,
    id: String
  },
  methods:{
    buyNode(id){
      console.log(`User clicked Node ${id}!`)
    }
  },
  mounted(){

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
