<template lang="html">
  <div class="auto-module">
    <div class="auto-module-top">
      <div class="auto-module-top-name">
        {{name}}
      </div>
      <div class="auto-module-top-eff">
        Efficiency: placeholder
      </div>
      <div class="auto-module-top-state">
        <button class="auto-module-toggle" @click="toggle" :class="{'auto--auto': auto}">
          Auto: {{auto ? "On" : "Off"}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    id: String,
    name: String,
    auto: Boolean
  },
  methods:{
    toggle(){
      this.$emit('toggle', this.id)
    }
  }
}
</script>

<style lang="css" scoped>
.auto-module{
  border: 2px solid var(--border-color);
  height: 40px;
  font-size: 17px;
  padding: 10px;
  margin-bottom: 20px;
}

.auto-module-top{
  display: flex;
  justify-content: space-between;
}

.auto-module-top-name, .auto-module-top-eff{
  padding: 10px;
  width: 200px;
}

.auto-module-top-state{
  width: 100px;
  display: flex;
  flex-direction: row-reverse;
}

.auto-module-toggle{
  width: 100px;
  padding: 10px;
  border: 2px solid var(--border-color-disabled);
}

.auto-module-toggle:hover{
  background-color: var(--background-color-enabled--hover)
}

.auto--auto{
  border-color: var(--border-color-enabled)
}

</style>
