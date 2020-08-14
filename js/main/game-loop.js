function gameLoop(that){
  let s = (Date.now() - that.player.lastUpdateTick)/1000

  //resolve this mess soon
  for (let i=0; i <= that.player.color.length-1; i++){
    if (that.player.color[i].timer > 0){
      that.player.color[i].timer -= s * formula.gain.color[i]().speed
      if (that.player.color[i].timer <= 0){
        that.player.color[i].amount += that.player.color[i].gainOnReset
        that.player.color[i].timer = 0
      }
    }
    if (that.player.color[i].highest < that.player.color[i].amount){
      that.player.color[i].highest = that.player.color[i].amount
    }
    if(that.player.color[i].auto && (that.player.color[i].timer == 0)){
      that.generateColor(i)
    }
  }

  for (let i=2; i >= 1; i--){
    if(that.player.color[i-1] !== undefined){
      if (that.player.color[i-1].amount >= 200){
        that.player.color[i].isUnlocked = true
      }
    }
    if (that.player.color[i].amount > 0){
      that.player.color[i].isUnlocked = true
    }
    if(that.player.color[i+1] !== undefined){
      if (that.player.color[i+1].isUnlocked){
        that.player.color[i].isUnlocked = true
      }
    }
  }


  that.player.lastUpdateTick = Date.now()
}
