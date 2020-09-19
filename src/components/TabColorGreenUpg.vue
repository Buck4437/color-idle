<template lang="html">
  <div class="container">
    <button class="upgrade" @click="buyUpg('21')" :class="{'upgrade--disabled': canBuyUpg('21') === false, 'upgrade--max': canBuyUpg('21') === 'max'}">
      <div>
        {{gameData.colorUpg["21"].desc}}
      </div>
      <div>
        Production Time: {{gameData.color[1].speed(player).gt(100) ? `1/${format.num(gameData.color[1].speed(player))}`: format.num(1/gameData.color[1].speed(player), 2)}}s
      </div>
      <div v-if="!(this.canBuyUpg('21') == 'max')">
        Cost: {{format.num(gameData.colorUpg["21"].cost(player))}} Green
      </div>
    </button>
    <button class="upgrade" @click="buyUpg('22')" :class="{'upgrade--disabled': canBuyUpg('22') === false, 'upgrade--max': canBuyUpg('22') === 'max'}">
      <div>
        {{gameData.colorUpg["22"].desc}}
      </div>
      <div>
        Multiplier: x{{format.num(gameData.color[1].multi(player), 2)}}
      </div>
      <div v-if="!(this.canBuyUpg('22') == 'max')">
        Cost: {{format.num(gameData.colorUpg["22"].cost(player))}} Green
      </div>
    </button>
    <button v-if="!(this.canBuyUpg('23') == 'max')" class="upgrade" @click="buyUpg('23')" :class="{'upgrade--disabled': canBuyUpg('23') === false, 'upgrade--max': canBuyUpg('23') === 'max'}">
      <div>
        {{gameData.colorUpg["23"].desc}}
      </div>
      <div>
        Cost: {{format.num(gameData.colorUpg["23"].cost(player))}} Green
      </div>
    </button>
    <button v-if="this.canBuyUpg('23') == 'max'" class="auto" :class="{'auto--auto': player.color[1].auto}" @click="toggleAuto(1)">
      <div>
        Mode: {{player.color[1].auto ? "Auto" : "Manual"}}
      </div>
      <div>
        Auto Efficiency: {{format.num(gameData.colorUpg["23"].effect(player)*100)}}%
      </div>
    </button>
  </div>
</template>

<script>
export default {
  methods:{
    canBuyUpg(u){
      let cTier = Number(u.charAt(0))-1
      let info = this.gameData.colorUpg[u]
      let uTier = this.player.colorUpg[u]
      if (uTier >= info.cap) return "max"
      let cost = info.cost(this.player)
      if (this.player.color[cTier].amount.gte(cost)){
        return true
      }
      return false
    },
    buyUpg(u){
      let cTier = Number(u.charAt(0))-1
      let uTier = this.player.colorUpg[u]
      let cost = this.gameData.colorUpg[u].cost(this.player)
      if (this.canBuyUpg(u) === true){
        this.player.color[cTier].amount = this.player.color[cTier].amount.minus(cost)
        this.player.colorUpg[u] = uTier + 1
      }
    },
    toggleAuto(i){
      this.player.color[i].auto = !this.player.color[i].auto
    }
  }
}
</script>

<style lang="css" scoped>
.upgrade, .auto{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  width: 22%;
  height: 100px;
  font-size: 12px;
  text-align: center;
  border-color: var(--border-color-enabled);
}

.upgrade:hover, .auto:hover{
  background-color: var(--background-color-enabled--hover);
}

.upgrade--disabled{
  background-color: var(--background-color-disabled);
  border-color: var(--border-color-disabled);
}

.upgrade--disabled:hover{
  background-color: var(--background-color-disabled);
  cursor: default;
}

.upgrade--max{
  border-color: var(--border-color-max);
  background-color: var(--background-color-max);
}

.upgrade--max:hover{
  background-color: var(--background-color-max);
  cursor: default;
}

.auto{
  border-color: var(--border-color-disabled);
}

.auto--auto{
  border-color: var(--border-color-enabled);
}

</style>
