<template lang="html">
  <div class="currency-container">
    <div class="currency-container-top">
      <currency-display :isHidden="!this.player.unlocks.color[0].color" class="red-currency"   name="Red"   :amount="player.color[0].amount"/>
      <currency-display :isHidden="!this.player.unlocks.color[1].color" class="green-currency" name="Green" :amount="player.color[1].amount"/>
      <currency-display :isHidden="!this.player.unlocks.color[2].color" class="blue-currency"  name="Blue"  :amount="player.color[2].amount"/>
    </div>
    <div class="currency-container-bottom">
      <div class="light-currency-container">
        <currency-display :isHidden="!player.unlocks.brightness.isUnlocked" class="light-currency"  name="Light"  :amount="player.brightness.light"/>
        <button v-if="player.unlocks.brightness.isUnlocked || gameData.light.gain(player).gte(1)"
                class="brightness-prestige-button" @click="brighten()"
               :class="{'brightness-prestige-button--disabled': gameData.light.gain(player).lt(1)}">
          <div v-if="!player.unlocks.brightness.isUnlocked && gameData.light.gain(player).gte(1)">
            Brighten.
          </div>
          <div v-if="player.unlocks.brightness.isUnlocked">
            + {{format.num(gameData.light.gain(player))}} Light
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import currencyDisplay from './TopContainerCurrency.vue'

export default {
  components: {
    currencyDisplay
  },
  methods:{
    brighten(){
      if (this.gameData.light.gain(this.player).lt(1)) return
      if (this.player.options.confirmation.brighten){
        if (this.player.unlocks.brightness.isUnlocked){
          if (!confirm("Brightening will reset all your colors and upgrades in exchange for lights. Proceed? (You can turn this confirmation off in options)")) return
        }
        else {
          if (!confirm("Brightening will reset all your colors and upgrades in exchange for new currencies and mechanics. Proceed?")) return
          this.player.stats.brightness.currentTime = this.player.stats.playTime //first brighten
          this.player.unlocks.brightness.isUnlocked = true
          this.$emit('switch-tab', 'brightness')
        }
      }
      this.player.brightness.light = this.player.brightness.light.add(this.gameData.light.gain(this.player))
      this.player.stats.brightness.resets += 1
      if (this.player.stats.brightness.currentTime < this.player.stats.brightness.fastestTime){
        this.player.stats.brightness.fastestTime = this.player.stats.brightness.currentTime
      }
      this.player.stats.brightness.currentTime = 0
      let keepUpgradeIDs = {
        11: "22",
        12: "24",
        13: "23",
        21: "32",
        22: "34",
        23: "33",
        31: "42",
        32: "45",
        33: "44",
        34: "43"
      }
      let keepAutoIDs = ["23", "33", "43"]
      for (let i = 0; i <= 2; i++){
        for (let key of Object.keys(this.defaultPlayer().color[i])){
          if (key == "auto"){
            let keepAuto = keepAutoIDs[i]
            if ((this.player.brightness.brightnessUpg[keepAuto]||0) >= 1) continue
          }
          this.player.color[i][key] = this.defaultPlayer().color[i][key]
        }
      }
      for (let key of Object.keys(keepUpgradeIDs)){
        let upgrade = keepUpgradeIDs[key]
        if ((this.player.brightness.brightnessUpg[upgrade]||0) < 1){
          this.player.colorUpg[key] = this.defaultPlayer().colorUpg[key]
        }
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped>
.currency-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.currency-container-top, .currency-container-bottom{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}

.red-currency, .green-currency, .blue-currency, .light-currency{
  font-size: 20px;
  min-width: 200px;
  padding: 10px;
  padding-left: 0px;
  text-align: left;
}

.brightness-prestige-button{
  margin-right: 10px;
  height: 50px;
  min-width: 200px;
  padding: 10px;
  border: 2px solid var(--color-brightness);
}

.brightness-prestige-button--disabled{
  background-color: var(--background-color-disabled);
  cursor: default;
}

.brightness-prestige-button--disabled:hover{
  background-color: var(--background-color-disabled);
}
</style>

<style>

</style>
