var app = new Vue({
  el: "#app",
  data:{
    dev,
    color,
    colorUpgInfo,
    formula,
    player
  },
  methods:{
    canBuyUpg(u){
      let cTier = Number(u.charAt(0))-1
      let info = this.colorUpgInfo[u]
      let uTier = this.player.colorUpg[u]||0
      if (uTier >= info.cap) return "max"
      let cost = this.formula.cUpg[u](uTier).cost
      if (this.player.color[cTier].amount.gte(cost)){
        return true
      }
      return false
    },
    buyUpg(u){
      let cTier = Number(u.charAt(0))-1
      let uTier = this.player.colorUpg[u]||0
      let cost = this.formula.cUpg[u](uTier).cost
      if (this.canBuyUpg(u) === true){
        this.player.color[cTier].amount = this.player.color[cTier].amount.minus(cost)
        this.player.colorUpg[u] = uTier + 1
      }
    },

    //change this reeeeeee
    //check out bootstrap later on
    collapse(s, i){
      let sels = document.getElementsByClassName(s)
      for (let el of sels){
        el.classList.toggle("coll-active");
      }
      let iels = document.getElementsByClassName(i)
      for (let el of iels){
        if (el.style.maxHeight){
          el.style.maxHeight = null;
        } else {
          el.style.maxHeight = el.scrollHeight + "px";
        }
      }
    },
    canGenerateColor(i){
      let c = this.player.color[i]
      if (c.timer.gt(0)) return "generating"
      if (i >= 1){
        if (formula.gain.color[i]().base.equals(0)) return false
      }
      return true
    },
    generateColor(i){
      if (this.canGenerateColor(i) !== true) return
      this.player.color[i].gainOnReset = formula.gain.color[i]().amount //used to store amount of color that will be generated
      if (i >= 1){
        for (let j = 0; j <= i-1; j++){
          this.player.color[j].amount = new Decimal(0)
          this.player.color[j].highest = new Decimal(0)
          this.player.color[j].gainOnReset = formula.gain.color[i]().amount
        }
      }
      this.player.color[i].timer = new Decimal(1)
    },
    toggleAuto(i){
      this.player.color[i].auto = !this.player.color[i].auto
      if(this.player.color[i].auto){
        //Manual to Auto
        return
      }
    },
    format(num, dp, sci, full){
      return format(num, dp, sci, full)
    },
    formatDate(seconds, pMode){
      return formatDate(seconds, pMode)
    },
    navigateTab(name){
      let tabs = document.getElementsByClassName("tab")
      for (let tab of tabs){
        tab.style = "display: none"
      }
      let seltabs = document.getElementsByClassName(name)
      for (let seltab of seltabs){
        seltab.style = "display: block"
      }
    },
    gameLoop(){
      gameLoop(this)
    }
  },
  computed: {
    colorProgressWidth(){
      return function(i){
        let t = this.player.color[i].timer.toNumber()
        return (1-t-Math.floor(1-t))*100 + '%'
      }
    }
  },
  mounted(){
    setInterval(this.gameLoop, 25)
  }
})
