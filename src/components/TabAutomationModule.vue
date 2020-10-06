<template lang="html">
  <div class="auto-module">
    <div class="auto-module-top">
      <div class="auto-module-top-name">
        {{name}}
      </div>
      <div class="auto-module-top-state">
        <button class="auto-module-toggle" @click="toggle" :class="{'auto--auto': auto}">
          Auto: {{auto ? "On" : "Off"}}
        </button>
      </div>
    </div>
    <div class="auto-module-bottom">
      <button class="auto-module-mode" @click="toggleMode">
        Mode: {{mode}}
      </button>
        Brighten at
        <!--change this !-->
        <input class="auto-module-input" v-model="player.brightness.auto.value"
                                         :class="{'auto-module-input--error': isNaN(Number(player.brightness.auto.value))}">
        {{desc}}
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
  computed:{
    mode(){
      switch (this.player.brightness.auto.mode){
        case 0:
          return "Amount"
        case 1:
          return "Time"
        case 2:
          return "Factor"
        default:
          return "Error"
      }
    },
    desc(){
      switch (this.player.brightness.auto.mode){
        case 0:
          return "Light or more"
        case 1:
          return "seconds or more"
        case 2:
          return "times unspent amount of Light or more"
        default:
          return "Error"
      }
    }
  },
  methods:{
    toggle(){
      this.$emit('toggle', this.id)
    },
    toggleMode(){
      this.$emit('toggleMode', this.id)
    }
  }
}
</script>

<style lang="css" scoped>
.auto-module{
  border: 2px solid var(--border-color);
  font-size: 17px;
  padding: 10px;
  margin-bottom: 20px;
}

.auto-module-top{
  display: flex;
  justify-content: space-between;
}

.auto-module-top-name{
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

.auto-module-bottom{
  padding: 10px;
  height: 50px;
}

.auto-module-mode{
  width: 120px;
  padding: 10px;
  margin-right: 20px;
}

.auto-module-input{
  background-color: var(--background-color)
}

.auto-module-input--error{
  border-color: var(--border-color-disabled)
}

</style>
