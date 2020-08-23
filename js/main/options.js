const options = {
  save(){
    localStorage.setItem('colorGameRemakeSave', JSON.stringify(player))
    console.log("Game saved.")
    clearInterval(saveInterval)
    saveInterval = setInterval(options.save, 15000)
  },
  reset(){
    if (prompt("Enter RESET in ALL CAPS to reset the game.") === "RESET"){
      clearInterval(saveInterval)
      localStorage.removeItem("colorGameRemakeSave")
      window.location.reload()
    }
  },
  import(){
    let saveStr = prompt("Import your save here:")
    if (saveStr === null || saveStr === "") return
    if (isValidSave(saveStr)){
      clearInterval(saveInterval)
      let save = window.atob(saveStr)
      localStorage.setItem("colorGameRemakeSave", save)
      window.location.reload()
      return
    }
    alert("Invalid save!")
  },
  export(){
    let saveStr = window.btoa(JSON.stringify(player))
    $("#options-export-field").css("display", "inline")
    $("#options-export-field").val(saveStr);
    $("#options-export-field").select();
    try {
      document.execCommand('copy');
      $("#options-export-field").css("display", "none")
      alert("Save copied to clipboard!")
    } catch (e) {
       $("#options-export-field").css("display", "none")
       prompt("Exported Save:", saveStr);
    }
  },
  load(){
    let save = JSON.parse(localStorage.getItem("colorGameRemakeSave"))
    if (save === null) return
    player = saveToDecimal(save, defaultPlayer())
  },
  theme: {
    switch(){
      player.options.theme ++
      if (player.options.theme >= themes.length){
        player.options.theme = 0
      }
    },
    current(){
      return themes[player.options.theme]
    }
  }
}

function saveToDecimal(obj, def){
  let data = obj //merging data from both obj and def together
  for (let key in def){
    if (obj[key] === undefined){
      data[key] = def[key]
    }
    else if(typeof obj[key] === "string" && def[key] instanceof Decimal){
      data[key] = new Decimal(obj[key])
    }
    else if(typeof obj[key] === "object" && typeof def[key] === "object"){
      data[key] = saveToDecimal(obj[key], def[key])
    }
    else if(typeof obj[key] !== typeof def[key]){
      data[key] = def[key]
    }
  }
  return data
}

function isValidSave(save){
  try {
    let parse = JSON.parse(window.atob(save))
    return true
  }
  catch (e){
    return false
  }
}

let saveInterval = setInterval(options.save, 15000)
