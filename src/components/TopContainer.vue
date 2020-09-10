<template lang="html">
  <div class="currency-container">
    <div class="currency-container-top">
      <currency-display :isHidden="!this.player.unlocks.color[0].color" class="red-currency"   name="Red"   :amount="player.color[0].amount"/>
      <currency-display :isHidden="!this.player.unlocks.color[1].color" class="green-currency" name="Green" :amount="player.color[1].amount"/>
      <currency-display :isHidden="!this.player.unlocks.color[2].color" class="blue-currency"  name="Blue"  :amount="player.color[2].amount"/>
    </div>
  </div>
</template>

<script>
import currencyDisplay from './TopContainerCurrency.vue'

export default {
  components: {
    currencyDisplay
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

.red-currency, .green-currency, .blue-currency{
  font-size: 20px;
  min-width: 200px;
  padding: 10px;
  text-align: left;
}
</style>

<style>

</style>
