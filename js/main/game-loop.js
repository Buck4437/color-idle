function gameLoop(that, s){
  if (s === undefined){
    s = (Date.now() - that.player.lastUpdateTick)/1000
    if (s < 0) {
      that.player.lastUpdateTick = Date.now()
      return //fuck time skipping
    }
    //simple offline progress circuit
    if (s > 60){
      for (let i = 1; i <= 1000; i++){
        gameLoop(that, s/1000) //1000 ticks
      }
    }
    $(".game-container").css("display", "block")
    $(".offline-progress-container").css("display", "none")
  }
  if (s < 0) {
    that.player.lastUpdateTick = Date.now()
    return //fuck time skipping
  }
  
  //resolve this mess soon
  for (let i=0; i <= that.player.color.length-1; i++){
    if (that.player.color[i].timer.gt(0)){
      that.player.color[i].timer = that.player.color[i].timer.minus(formula.gain.color[i]().speed.times(s))
      if (that.player.color[i].timer.lte(0)){
        that.player.color[i].amount = that.player.color[i].amount.plus(that.player.color[i].gainOnReset)
        that.player.color[i].timer = new Decimal(0)
      }
    }
    if (that.player.color[i].highest.lt(that.player.color[i].amount)){
      that.player.color[i].highest = that.player.color[i].amount
    }
    if(that.player.color[i].auto && (that.player.color[i].timer.equals(0))){
      that.generateColor(i)
    }
  }

  //unlock stuff
  for (let i = 2; i >= 0; i--){
    if(that.player.color[i-1] !== undefined){
      if (that.player.color[i-1].amount.gte(500)){
        that.player.unlocks.color[i].color = true
      }
    }
    if (that.player.color[i].amount.gt(0)){
      that.player.unlocks.color[i].color = true
      that.player.unlocks.color[i].upgrade = true
    }
    if(that.player.color[i+1] !== undefined){
      if (that.player.color[i+1].isUnlocked){
        that.player.unlocks.color[i].color = true
        that.player.unlocks.color[i].upgrade = true
      }
    }
  }

  that.player.stats.playTime += s

  that.player.lastUpdateTick = Date.now()
}
