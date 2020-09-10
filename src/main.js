import Vue from 'vue'
import App from './App.vue'

import format from './js/Format.js'
import defaultPlayer from './js/Player.js'
import gameData from './js/GameData.js'
import gameLoop from './js/GameLoop.js'
import Decimal from './lib/break_infinity.min.js'
import saveToDecimal from './js/SaveToDecimal.js'

var player = defaultPlayer()
let save = JSON.parse(localStorage.getItem("colorGameRemakeSave"))
if (save !== null){
  player = saveToDecimal(save, defaultPlayer())
  console.log("Game Loaded.")
}

Vue.mixin({
  data(){
    return {
      format,
      player,
      defaultPlayer,
      gameData,
      gameLoop,
      Decimal
    }
  }
})

window.app = new Vue({
  render: h => h(App)
}).$mount('#app')
