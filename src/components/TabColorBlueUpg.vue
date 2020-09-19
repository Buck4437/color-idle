<template lang="html">
  <div class="container">
    <button class="upgrade" @click="buyUpg('31')" :class="{'upgrade--disabled': canBuyUpg('31') === false, 'upgrade--max': canBuyUpg('31') === 'max'}">
      <div>
        {{gameData.colorUpg["31"].desc}}
      </div>
      <div>
        Production Time: {{gameData.color[2].speed(player).gt(100) ? `1/${format.num(gameData.color[2].speed(player))}`: format.num(1/gameData.color[2].speed(player), 2)}}s
      </div>
      <div v-if="!(this.canBuyUpg('31') == 'max')">
        Cost: {{format.num(gameData.colorUpg["31"].cost(player))}} Blue
      </div>
    </button>
    <button class="upgrade" @click="buyUpg('32')" :class="{'upgrade--disabled': canBuyUpg('32') === false, 'upgrade--max': canBuyUpg('32') === 'max'}">
      <div>
        {{gameData.colorUpg["32"].desc}}
      </div>
      <div>
        Multiplier: x{{format.num(gameData.color[2].multi(player), 2)}}
      </div>
      <div v-if="!(this.canBuyUpg('32') == 'max')">
        Cost: {{format.num(gameData.colorUpg["32"].cost(player))}} Blue
      </div>
    </button>
    <button class="upgrade" @click="buyUpg('33')" :class="{'upgrade--disabled': canBuyUpg('33') === false, 'upgrade--max': canBuyUpg('33') === 'max'}">
      <div>
        {{gameData.colorUpg["33"].desc}}
      </div>
      <div>
        Effect: +{{format.num(gameData.colorUpg["33"].effect(player)*100)}}%
      </div>
      <div v-if="!(this.canBuyUpg('33') == 'max')">
        Cost: {{format.num(gameData.colorUpg["33"].cost(player))}} Blue
      </div>
    </button>
    <button v-if="!(this.canBuyUpg('34') == 'max')" class="upgrade" @click="buyUpg('34')" :class="{'upgrade--disabled': canBuyUpg('34') === false, 'upgrade--max': canBuyUpg('34') === 'max'}">
      <div>
        {{gameData.colorUpg["34"].desc}}
      </div>
      <div>
        Cost: {{format.num(gameData.colorUpg["34"].cost(player))}} Blue
      </div>
    </button>
    <button v-if="this.canBuyUpg('34') == 'max'" class="auto" :class="{'auto--auto': player.color[2].auto}" @click="toggleAuto(2)">
      <div>
        Mode: {{player.color[2].auto ? "Auto" : "Manual"}}
      </div>
      <div>
        Auto Efficiency: {{format.num(gameData.colorUpg["34"].effect(player)*100)}}%
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
