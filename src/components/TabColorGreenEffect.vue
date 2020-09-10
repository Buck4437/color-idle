<template lang="html">
  <div>
    <div class="color-effect-text">
      Your highest amount of Green (<span class="color-effect-green">{{format.num(player.color[1].highest)}}</span>) multiplies previous color by x<span class="color-effect-green">{{format.num(gameData.color[1].effect(player), 2)}}</span>.<br>
      This amount resets when you perform any higher level of reset.
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.color-effect-green{
  color: var(--color-green);
  font-size: 20px
}
</style>
