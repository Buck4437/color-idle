<template lang="html">
  <div>
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
