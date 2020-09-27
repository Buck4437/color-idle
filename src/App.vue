<template lang="html">
  <div id="app">
    <div id="game-container" style="display: none">
      <currency-container @switch-tab="selectTab"/>
      <navigation-container class="navigation-container" @select-button="selectTab"/>
      <tab-color      v-show="selectedTab === 'color'" :canGenerate="canGenerateColor()" @generate="generateColor"/>
      <tab-brightness v-show="selectedTab === 'brightness'"/>
      <tab-automation v-show="selectedTab === 'automation'"  />
      <tab-statistics v-show="selectedTab === 'stats'"  />
      <tab-options    v-show="selectedTab === 'options'"/>
    </div>
    <div id="offline-progress-container">
      Simulating Offline Progress...
    </div>
  </div>
</template>

<script>
import currencyContainer from './components/TopContainer.vue'
import navigationContainer from './components/NavigationBarTop.vue'
import tabColor from './components/TabColor.vue'
import tabBrightness from './components/TabBrightness.vue'
import tabAutomation from './components/TabAutomation.vue'
import tabStatistics from './components/TabStatistics.vue'
import tabOptions from './components/TabOptions.vue'

export default {
  components: {
    currencyContainer,
    navigationContainer,
    tabColor,
    tabBrightness,
    tabAutomation,
    tabStatistics,
    tabOptions
  },
  data(){
    return{
      selectedTab: "color"
    }
  },
  methods:{
    selectTab(id){
      this.selectedTab = id
    },
    canGenerateColor(){
      let array = []
      for (let i=0;i<=2;i++){
        let c = this.player.color[i]
        if (c.timer.gt(0)) array.push("generating")
        else if (i >= 1){
          array.push(!this.gameData.color[i].base(this.player).equals(0))
        }
        else array.push(true)
      }
      return array
    },
    generateColor(i){
      if (this.canGenerateColor()[i] !== true) return
      this.player.color[i].timer = new this.Decimal(1)
      this.player.color[i].gainOnReset = this.gameData.color[i].gain(this.player) //used to store amount of color that will be generated
      if (i >= 1){
        for (let j = 0; j <= i-1; j++){
          this.player.color[j].amount = new this.Decimal(0)
          this.player.color[j].highest = new this.Decimal(0)
          this.player.color[j].gainOnReset = this.gameData.color[i].gain(this.player)
        }
      }
    },
    loop(){
      return this.gameLoop(this)
    }
  },
  mounted(){
    setInterval(this.loop, 25)
  },
}
</script>


<style src="./css/ColorPalette.css"></style>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inconsolata&display=swap');

*{
  color: var(--color);
}

body{
  background-color: var(--background-color);
}

#app{
  font-family: 'Inconsolata', monospace;
  font-size: 15px;
  max-width: 800px;
  margin: auto;
  padding: 15px;
  width: 1000px;
}

button{
  font-family: 'Inconsolata', monospace;
  font-size: 13px;
  border: 2px solid;
  cursor: pointer;
  transition-duration: 0.2s;
  user-select: none;
  align-items: stretch; /* for flexboxes */
  border-color: var(--border-color-button);
  background-color: var(--background-color);
}

button:hover{
  background-color: var(--button--hover);
}

.navigation-container button{
  font-size: 20px;
  min-width: 120px;
  margin-right: 10px;
  padding: 10px;
  cursor: pointer;
}

</style>
