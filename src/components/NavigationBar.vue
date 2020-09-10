<template lang="html">
  <div class="navigation-container">
    <button v-for="button in buttonActive" :key="button.id" @click="click(button.id)" class="nav-button">
      {{button.text}}
    </button>
  </div>
</template>

<script>
export default{
  props:{
    buttons: Array
  },
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

.nav-button{
  font-size: 15px;
  min-width: 160px;
  margin-right: 10px;
  text-align: center;
  cursor: pointer;
}
</style>
