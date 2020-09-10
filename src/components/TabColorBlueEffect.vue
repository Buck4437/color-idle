<template lang="html">
  <div>
    <div class="color-effect-text">
      Your highest amount of Blue (<span class="color-effect-blue">{{format.num(player.color[2].highest)}}</span>) multiplies previous color by x<span class="color-effect-blue">{{format.num(gameData.color[2].effect(player), 2)}}</span>.<br>
      This amount resets when you perform any higher level of reset.
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.color-effect-blue{
  color: var(--color-blue);
  font-size: 20px
}
</style>
