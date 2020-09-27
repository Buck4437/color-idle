<template lang="html">
  <div>
    <auto-module v-if="player.colorUpg['13'] >= 1" :id="'red'"   :name="'Red Generator'"     :auto="player.color[0].auto" @toggle="toggle"></auto-module>
    <auto-module v-if="player.colorUpg['23'] >= 1" :id="'green'" :name="'Green Generator'"   :auto="player.color[1].auto" @toggle="toggle"></auto-module>
    <auto-module v-if="player.colorUpg['34'] >= 1" :id="'blue'"  :name="'Blue Generator'"    :auto="player.color[2].auto" @toggle="toggle"></auto-module>
  </div>
</template>

<script>
import autoModule from "./TabAutomationModule.vue"

export default {
  components:{
    autoModule
  },
  methods:{
    toggle(id){
      switch (id){
        case 'red':
          this.player.color[0].auto = !this.player.color[0].auto
          break
        case 'green':
          this.player.color[1].auto = !this.player.color[1].auto
          break
        case 'blue':
          this.player.color[2].auto = !this.player.color[2].auto
          break
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
