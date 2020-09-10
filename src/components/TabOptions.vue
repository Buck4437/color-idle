<template lang="html">
  <div>
    <div>
      <button class="options-button" @click="save">Save</button>
      <button class="options-button" @click="reset">Reset</button>
      <button class="options-button" @click="toggleConfirmation('brighten')" v-if="player.unlocks.brightness.isUnlocked">Brighten Confirmation: {{player.options.confirmation.brighten ? "On" : "Off"}}</button>
    </div>
    <div>
      <button class="options-button" @click="importSave">Import</button>
      <button class="options-button" @click="exportSave">Export</button>
    </div>
    <div>
      <button class="options-button" @click="themeSwitch">Theme: {{themeName}}</button>
    </div>
    <br>
    Game autosaves every 15 seconds
    <br>
    <a href="https://discord.com/invite/N8MuKMz" target="_blank">Discord server</a> |
    <a href="changelog.html" target="_blank">Changelog</a>
    <input id="options-export-field" style="display: none;">
  </div>
</template>

<script>
import saveToDecimal from '../js/SaveToDecimal.js'

function isValidSave(save){
  try {
    JSON.parse(window.atob(save))
    return true
  }
  catch (e){
    return false
  }
}

export default {
  data(){
    return {
      theme: {
        classNames: ["light-theme", "dark-theme"],
        themeNames: ["Light", "Dark"]
      },
      saveToDecimal,
      saveInterval: null,
      isValidSave
    }
  },
  computed:{
    themeName(){
      let themeClasses = this.theme.classNames
      let themeNames = this.theme.themeNames
      for (let themeClass of themeClasses){
        document.body.classList.remove(themeClass)
      }
      document.body.classList.add(themeClasses[this.player.options.theme])
      return themeNames[this.player.options.theme]
    }
  },
  methods:{
    save(){
      localStorage.setItem('colorGameRemakeSave', JSON.stringify(this.player))
      console.log("Game saved.")
      clearInterval(this.saveInterval)
      this.saveInterval = setInterval(this.save, 15000)
    },
    reset(){
      if (prompt("Enter RESET in ALL CAPS to reset the game.") === "RESET"){
        clearInterval(this.saveInterval)
        localStorage.removeItem("colorGameRemakeSave")
        window.location.reload()
      }
    },
    importSave(){
      let saveStr = prompt("Import your save here (Your save will be overwritten!):")
      if (saveStr === null || saveStr === "") return
      if (this.isValidSave(saveStr)){
        clearInterval(this.saveInterval)
        localStorage.setItem("colorGameRemakeSave", window.atob(saveStr))
        window.location.reload()
        return
      }
      alert("Invalid save!")
    },
    exportSave(){
      let saveStr = window.btoa(JSON.stringify(this.player))
      let field = document.getElementById('options-export-field')
      field.style.display = "inline"
      field.value = saveStr
      field.select()
      try {
        document.execCommand('copy');
        field.style.display = "none"
        alert("Save copied to clipboard!")
      } catch (e) {
         field.style.display = "none"
         prompt("Exported Save:", saveStr);
      }
    },
    themeSwitch(){
      this.player.options.theme ++
      if (this.player.options.theme > this.theme.classNames.length - 1) this.player.options.theme = 0
    },
    toggleConfirmation(name){
      this.player.options.confirmation[name] = !this.player.options.confirmation[name]
    }
  },
  mounted(){
    this.saveInterval = setInterval(this.save, 15000)
  }
}
</script>

<style lang="css" scoped>
.options-button{
  font-size: 17px;
  vertical-align: top;
  font-size: 17px;
  width: 170px;
  height: 70px;
  margin-bottom: 15px;
  margin-right: 10px;
}
</style>
