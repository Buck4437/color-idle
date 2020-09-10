<template lang="html">
  <div class="navigation-container">
    <button @click="click('color')">Color</button>
    <button @click="click('brightness')" class="brightness-navigation" v-if="player.unlocks.brightness.isUnlocked">Brightness</button>
    <button @click="click('stats')">Statistics</button>
    <button @click="click('options')">Options</button>
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
  text-align: center;
  margin-bottom: 20px;
}

.brightness-navigation{
  color: var(--color-brightness);
  border-color: var(--color-brightness);
}
</style>
