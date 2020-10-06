import Decimal from '../lib/break_infinity.min.js'
import gameData from './GameData.js'

function gameLoop(that, s){
  if (s === undefined){
    s = (Date.now() - that.player.lastUpdateTick)/1000
    if (s < 0) {
      that.player.lastUpdateTick = Date.now()
      return //fuck time skipping
    }
    //simple offline progress circuit
    if (s > 60){
      for (let i = 1; i <= 1000; i++){ //1000 ticks
        gameLoop(that, s/1000)
      }
    }
    document.getElementById("game-container").style.display = "block"
    document.getElementById("offline-progress-container").style.display = "none"
  }
  if (s < 0) {
    that.player.lastUpdateTick = Date.now()
    return //fuck time skipping
  }

  //auto brighten
  //don't judge me I will rewrite the code entirely again this is just a bodge
  if (that.player.brightness.auto.isToggled){
    if (!isNaN(Number(that.player.brightness.auto.value))){
      let brighten = function(){
        that.player.brightness.light = that.player.brightness.light.add(that.gameData.light.gain(that.player))
        that.player.stats.brightness.resets += 1
        if (that.player.stats.brightness.currentTime < that.player.stats.brightness.fastestTime){
          that.player.stats.brightness.fastestTime = that.player.stats.brightness.currentTime
        }
        that.player.stats.brightness.currentTime = 0
        let keepUpgradeIDs = {
          11: "22",
          12: "24",
          13: "23",
          21: "32",
          22: "34",
          23: "33",
          31: "42",
          32: "45",
          33: "44",
          34: "43"
        }
        let keepAutoIDs = ["23", "33", "43"]
        for (let i = 0; i <= 2; i++){
          for (let key of Object.keys(that.defaultPlayer().color[i])){
            if (key == "auto"){
              let keepAuto = keepAutoIDs[i]
              if ((that.player.brightness.brightnessUpg[keepAuto]||0) >= 1) continue
            }
            that.player.color[i][key] = that.defaultPlayer().color[i][key]
          }
        }
        for (let key of Object.keys(keepUpgradeIDs)){
          let upgrade = keepUpgradeIDs[key]
          if ((that.player.brightness.brightnessUpg[upgrade]||0) < 1){
            that.player.colorUpg[key] = that.defaultPlayer().colorUpg[key]
          }
        }
      }
      switch (that.player.brightness.auto.mode){
        case 0:
          if (gameData.light.gain(that.player) >= Math.max(1, Number(that.player.brightness.auto.value))){
            brighten()
          }
          break
        case 1:
          if ((gameData.light.gain(that.player) >= 1) && (that.player.stats.brightness.currentTime >= Number(that.player.brightness.auto.value))){
            brighten()
          }
          break
        case 2:
          if (gameData.light.gain(that.player) >= Math.max(1, that.player.brightness.light.times(Number(that.player.brightness.auto.value)))){
            brighten()
          }
          break
      }
    }
  }


  //decrease generator timer
  for (let i=0; i <= that.player.color.length-1; i++){
    if (that.player.color[i].timer.gt(0)){
      that.player.color[i].timer = that.player.color[i].timer.minus(gameData.color[i].speed(that.player).times(s))
      if (that.player.color[i].timer.lte(0)){
        that.player.color[i].amount = that.player.color[i].amount.plus(that.player.color[i].gainOnReset.times(that.player.color[i].timer.abs().floor().plus(1))) //to make production dynamic when production time is low enough
        that.player.color[i].timer = new Decimal(0)
      }
    }
    if (that.player.color[i].highest.lt(that.player.color[i].amount)){
      that.player.color[i].highest = that.player.color[i].amount
    }
    if(that.player.color[i].timer.lte(0)&&that.player.color[i].auto){
      that.generateColor(i)
    }
  }

  //unlock stuff
  for (let i = 2; i >= 0; i--){
    if(that.player.color[i-1] !== undefined){
      if (that.player.color[i-1].amount.gte(1000)){
        that.player.unlocks.color[i].color = true
      }
    }
    if (that.player.color[i].amount.gt(0)){
      that.player.unlocks.color[i].color = true
      that.player.unlocks.color[i].upgrade = true
    }
    if(that.player.color[i+1] !== undefined){
      if (that.player.unlocks.color[i+1].color){
        that.player.unlocks.color[i].color = true
        that.player.unlocks.color[i].upgrade = true
      }
    }
  }
  if (that.player.color[2].amount.gt(10000)){
    that.player.unlocks.colorScaling = true
  }

  that.player.stats.playTime += s
  that.player.stats.brightness.currentTime += s


  that.player.lastUpdateTick = Date.now()
}


export default gameLoop
