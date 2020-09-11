<template lang="html">
  <div>
    <div>
      Hover over the nodes to view their descriptions, click on the nodes to buy the corresponding upgrades.
    </div>
    <node-tree class="node-tree" :nodes="gameData.brightnessUpg" :id="'brightness-Upg'"/>
  </div>
</template>

<script>
import nodeTree from './NodeTree.vue'

export default {
  components: {
    nodeTree
  }
}
</script>

<style lang="css" scoped>
</style>
