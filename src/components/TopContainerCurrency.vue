<template lang="html">
  <div>
    <span v-if="!isHidden" :class="name">{{name}}: {{format.num(amount)}}</span>
  </div>
</template>

<script>
export default{
  props:{
    name: String,
    amount: [Object, Number],
    isHidden: Boolean
  }
}
</script>

<style lang="css" scoped>
.Red{
  color: var(--color-red)
}

.Green{
  color: var(--color-green)
}

.Blue{
  color: var(--color-blue)
}
</style>
