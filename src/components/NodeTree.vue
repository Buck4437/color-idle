<template lang="html">
  <div style="position: relative; width: 800px;">
    <button v-for="node in nodes" class="nodes"
                                  style="position: absolute; z-index: 1;" :key=node.id
                                 :style="{'left': '100%'}">
      <div>{{node.name}}</div>
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
  },
  mounted(){

  },
}
</script>

<style lang="css" scoped>
.nodes{
  width: 100px;
  height: 100px;
  font-size: 20px;
  border-radius: 50%;
}
</style>
