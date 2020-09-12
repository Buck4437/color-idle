<template lang="html">
  <div>
    <div>
      Hover over the nodes to view their descriptions, click on the nodes to buy the corresponding upgrades.
    </div>
    <node-tree class="node-tree" :nodes="gameData.brightnessUpg" @select-node="buyUpgrade"/>
  </div>
</template>

<script>
import nodeTree from './TabBrightnessTabUpgradesTree.vue'

export default {
  components: {
    nodeTree
  },
  methods:{
    buyUpgrade(id){
      if (this.player.brightness.brightnessUpg[id] >= 1) return
      let parents = this.gameData.brightnessUpgNode(id).parents
      if (parents !== undefined){
        for (let parent of parents){
          if (this.player.brightness.brightnessUpg[parent] < 1) return
        }
      }
      if (this.player.brightness.light.lt(this.gameData.brightnessUpgNode(id).cost)) return
      this.player.brightness.light = this.player.brightness.light.minus(this.gameData.brightnessUpgNode(id).cost)
      this.player.brightness.brightnessUpg[id] = 1
      this.render()
    }
  }
}
</script>

<style lang="css" scoped>
</style>
