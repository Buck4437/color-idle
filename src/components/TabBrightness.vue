<template lang="html">
  <div>
    <navigation-bar :buttons="buttons" @select-button="selectTab" style="display: none;"/>
    <subtab-upgrades v-show="selectedTab == 'upgrades'"/>
  </div>
</template>

<script>
import navigationBar from './NavigationBar.vue'
import subtabUpgrades from './TabBrightnessTabUpgrades.vue'
export default {
  components:{
    navigationBar,
    subtabUpgrades
  },
  data(){
    return{
      buttons:[
        {
          id: "upgrades",
          text: "Upgrades",
          isHidden: false
        }
      ],
      selectedTab: "upgrades"
    }
  },
  methods:{
    selectTab(id){
      this.selectedTab = id
    }
  }
}
</script>

<style lang="css" scoped>

</style>
