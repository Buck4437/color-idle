const options = {
  save(){
    localStorage.setItem('player', JSON.stringify(player))
    console.log("Game saved")
  }
}

setInterval(options.save, 15000)
