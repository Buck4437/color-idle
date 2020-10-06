<template lang="html">
  <div>
    <auto-module :id="'brightness'" :name="'Auto brighten'" :auto="player.brightness.auto.isToggled" @toggle="toggle" @toggleMode="toggleMode"></auto-module>
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
        case 'brightness':
          this.player.brightness.auto.isToggled = !this.player.brightness.auto.isToggled
          break
      }
    },
    toggleMode(id){
      switch (id){
        case 'brightness':
          this.player.brightness.auto.mode ++
          if (this.player.brightness.auto.mode > 2) this.player.brightness.auto.mode = 0
          break
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
