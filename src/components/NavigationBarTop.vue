<template lang="html">
  <div class="navigation-container">
    <div class="navigation-row-container">
      <button @click="click('color')">Color</button>
      <button @click="click('automation')" v-if="player.brightness.brightnessUpg['52'] >= 1">Automation</button>
      <button @click="click('stats')">Statistics</button>
      <button @click="click('options')">Options</button>
    </div>
    <div class="navigation-row-container">
      <button @click="click('brightness')" class="brightness-navigation" v-if="player.unlocks.brightness.isUnlocked">Brightness</button>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return{
      selectedButton: ""
    }
  },
  computed:{
    buttonActive(){
      let array = []
      for (let button of this.buttons){
        if (button.isHidden !== true) array.push(button)
      }
      return array
    }
  },
  methods:{
    click(id){
      this.selectedButton = id
      this.$emit('select-button', id)
    }
  }
}
</script>

<style lang="css" scoped>
.navigation-container{
  display: flex;
  flex-direction: column;
  text-align: center;
}

.navigation-row-container{
  display: flex;
  text-align: center;
  margin-bottom: 20px;
}


.brightness-navigation{
  color: var(--color-brightness);
  border-color: var(--color-brightness);
}
</style>
