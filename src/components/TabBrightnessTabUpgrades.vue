<template lang="html">
  <div>
    <div style="text-align: center">
      Hover over the nodes to view their description, click on the nodes to buy the corresponding upgrade.
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
