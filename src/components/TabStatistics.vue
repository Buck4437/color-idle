<template lang="html">
  <div>
    <div class="stats-con">
      <div class="stats">Total play time: {{format.date(player.stats.playTime)}}</div>
    </div>
    <div class="stats-con" v-if="player.unlocks.brightness.isUnlocked">
      <div class="stats stats-brightness">Number of times brightened: {{format.num(player.stats.brightness.resets)}}</div>
      <div class="stats stats-brightness">Time spent in current brighten: {{format.date(player.stats.brightness.currentTime, true)}}</div>
      <div class="stats stats-brightness">Fastest brighten: {{format.date(player.stats.brightness.fastestTime, true)}}</div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.stats{
  margin-bottom: 20px;
  font-size: 17px;
}

.stats-con{
  margin-bottom: 50px;
}

.stats-brightness{
  color: var(--color-brightness)
}
</style>
