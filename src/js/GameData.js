import Decimal from '../lib/break_infinity.min.js'
import format from './Format.js'

function brightnessUpgState(that, player){
  if (player.brightness.brightnessUpg[that.id] >= 1) return "bought"
  if (that.parents !== undefined){
    for (let parent of that.parents){
      if (player.brightness.brightnessUpg[parent] < 1) return "locked"
    }
  }
  if (player.brightness.light.lt(that.cost)) return "disabled"
  return "default"
}

var gameData = {
  color: [
    {
      base(){
        return new Decimal(1)
      },
      multi(player){
        let multi = new Decimal(1)
                    .times(gameData.colorUpg["12"].effect(player))
                    .times(gameData.color[1].effect(player))
                    .times(gameData.color[2].effect(player))
                    .times(player.brightness.brightnessUpg["11"] ? gameData.brightnessUpgNode("11").effect(player) : 1)
                    .times(player.brightness.brightnessUpg["21"] ? gameData.brightnessUpgNode("21").effect(player) : 1)
                    .times(player.brightness.brightnessUpg["25"] ? gameData.brightnessUpgNode("25").effect(player) : 1)
        return multi
      },
      gain(player){
        return this.base(player).times(this.multi(player))
      },
      speed(player){
        let speed = new Decimal(1) //increase = faster, decrease = slower
                    .times(gameData.colorUpg["11"].effect(player))
                    .times(player.color[0].auto ? gameData.colorUpg["13"].effect(player) : 1)
        return speed
      }
    },
    {
      base(player){
        let red = player.color[0].amount
        if (red.lte(0)) red = new Decimal(1) // because of Math.log10(red)

        let base = Decimal.pow(10, Decimal.log10(red)/Decimal.log10(1500)-1)
        if (red.lt(1500)) base = new Decimal(0)
        return base
      },
      multi(player){
        let multi = new Decimal(1)
                    .times(gameData.colorUpg["22"].effect(player))
                    .times(player.brightness.brightnessUpg["11"] ? gameData.brightnessUpgNode("11").effect(player) : 1)
                    .times(player.brightness.brightnessUpg["31"] ? gameData.brightnessUpgNode("31").effect(player) : 1)
                    .times(player.brightness.brightnessUpg["35"] ? gameData.brightnessUpgNode("35").effect(player) : 1)
        return multi
      },
      gain(player){
        return this.base(player).times(this.multi(player))
      },
      speed(player){
        let speed = new Decimal(1) //increase = faster, decrease = slower
                    .times(gameData.colorUpg["21"].effect(player))
                    .times(player.color[1].auto ? gameData.colorUpg["23"].effect(player) : 1)
        return speed
      },
      effect(player){
        let effect = new Decimal(1)
                    .times(player.color[1].highest.times(2.5).plus(1).pow(0.75)) //(2.5x+1)^0.75

        return effect
      }
    },
    {
      base(player){
        let green = player.color[1].amount
        if (green.lte(0)) green = new Decimal(1) // because of Math.log10(red)

        let base = Decimal.pow(10, Decimal.log10(green)/Decimal.log10(1500)-1)
        if (green.lt(1500)) base = new Decimal(0)
        return base
      },
      multi(player){
        let multi = new Decimal(1)
                    .times(gameData.colorUpg["32"].effect(player))
                    .times(player.brightness.brightnessUpg["11"] ? gameData.brightnessUpgNode("11").effect(player) : 1)
        return multi
      },
      gain(player){
        return this.base(player).times(this.multi(player))
      },
      speed(player){
        let speed = new Decimal(1) //increase = faster, decrease = slower
                    .times(gameData.colorUpg["31"].effect(player))
                    .times(player.color[2].auto ? gameData.colorUpg["34"].effect(player) : 1)
        return speed
      },
      effect(player){
        let effect = new Decimal(1)
                    .times(player.color[2].highest.times(2.5).plus(1).pow(0.7)) //(2.5x+1)^0.7

        return effect
      }
    },
  ],
  colorUpg:{
    11:{
      desc: "Reduce production time by 20%",
      cap: 10,
      cost(player){
        let t = player.colorUpg["11"]
        return new Decimal(1).times(new Decimal(2).pow(t||0))
      },
      effect(player){
        let t = player.colorUpg["11"]
        let effect = 1.25**(t||0) // reduce 20% timer = x1.25 faster
        if (t >= this.cap) effect = 10 //set the production time to 0.10s
        return effect
      }
    },
    12:{
      desc: "x1.5 Multiplier to Red gain",
      cap: 5,
      cost(player){
        let t = player.colorUpg["12"]
        return new Decimal(5).times(new Decimal(3).pow(t||0))
      },
      effect(player){
        let t = player.colorUpg["12"]
        let effect = 1.5**(t||0)
        return effect
      }
    },
    13:{
      desc: "Unlock automation mode",
      cap: 1,
      cost(){
        return new Decimal(20)
      },
      effect(player){
        let effect = 0.50 // reduce 20% timer = x1.25 faster\
            effect += gameData.colorUpg["33"].effect(player)
        return effect
      }
    },
    21:{
      desc: "Reduce production time by 20%",
      cap: 10,
      cost(player){
        let t = player.colorUpg["21"]
        return new Decimal(1).times(new Decimal(2).pow(t||0))
      },
      effect(player){
        let t = player.colorUpg["21"]
        let effect = 1.25**(t||0) // reduce 20% timer = x1.25 faster
        if (t >= this.cap) effect = 10 //set the production time to 0.10s
        return effect
      }
    },
    22:{
      desc: "x1.5 Multiplier to Green gain",
      cap: 5,
      cost(player){
        let t = player.colorUpg["22"]
        return new Decimal(5).times(new Decimal(3).pow(t||0))
      },
      effect(player){
        let t = player.colorUpg["22"]
        let effect = 1.5**(t||0)
        return effect
      }
    },
    23:{
      desc: "Unlock automation mode",
      cap: 1,
      cost(){
        return new Decimal(20)
      },
      effect(){
        let effect = 0.50 // reduce 20% timer = x1.25 faster
        return effect
      }
    },
    31:{
      desc: "Reduce production time by 20%",
      cap: 10,
      cost(player){
        let t = player.colorUpg["31"]
        return new Decimal(1).times(new Decimal(2).pow(t||0))
      },
      effect(player){
        let t = player.colorUpg["31"]
        let effect = 1.25**(t||0) // reduce 20% timer = x1.25 faster
        if (t >= this.cap) effect = 10 //set the production time to 0.10s
        return effect
      }
    },
    32:{
      desc: "x1.5 Multiplier to Blue gain",
      cap: 5,
      cost(player){
        let t = player.colorUpg["32"]
        return new Decimal(5).times(new Decimal(3).pow(t||0))
      },
      effect(player){
        let t = player.colorUpg["32"]
        let effect = 1.5**(t||0)
        return effect
      }
    },
    33:{
      desc: "Red auto efficiency +25%",
      cap: 2,
      cost(player){
        let t = player.colorUpg["33"]
        return new Decimal(10).times(new Decimal(10).pow(t||0))
      },
      effect(player){
        let t = player.colorUpg["33"]
        let effect = 0.25*(t||0)
        return effect
      }
    },
    34:{
      desc: "Unlock automation mode",
      cap: 1,
      cost(){
        return new Decimal(20)
      },
      effect(){
        let effect = 0.50 // reduce 20% timer = x1.25 faster
        return effect
      }
    }
  },
  light:{
    base(player){
      let blue = player.color[2].amount
      if (blue.lte(0)) blue = new Decimal(1) // because of Math.log10(blue)

      let base = Decimal.pow(10, Decimal.log10(blue)/Decimal.log10(1500)-1)
      if (blue.lt(1500)) base = new Decimal(0)
      return base
    },
    multi(){
      let multi = new Decimal(1)
      return multi
    },
    gain(player){
      return Decimal.floor(this.base(player).times(this.multi(player))) //must be integer
    },
  },
  brightnessUpgNode(id){
    for (let node of this.brightnessUpg){
      if (node.id == id) return node
    }
    return
  },
  brightnessUpg:[
    {
      id: "11",
      pos: [0.5, 100],
      name: "x2",
      cost: new Decimal(1),
      desc(player){
        let cost = `<br><br> Cost : ${this.cost} Light`
        if (player.brightness.brightnessUpg[this.id] >= 1) cost = ""
        return `x2 multiplier to all colors
                ${cost}`
      },
      effect(){
        return new Decimal(2)
      },
      state(player){
        return brightnessUpgState(this, player)
      }
    },
    {
      id: "21",
      pos: [0.1, 250],
      name: "T -> R",
      cost: new Decimal(1),
      parents: ["11"],
      desc(player){
        let cost = `<br><br> Cost : ${this.cost} Light`
        if (player.brightness.brightnessUpg[this.id] >= 1) cost = ""
        return `Multiplier to Red based on time spent in current brighten<br><br>
                Currently: x${format.num(this.effect(player), 2)}
                ${cost}`
      },
      effect(player){
        return Math.log10(player.stats.brightness.currentTime + 1)/1.5 + 1
      },
      state(player){
        return brightnessUpgState(this, player)
      }
    },
    {
      id: "22",
      pos: [0.3, 250],
      name: "Keep RP",
      cost: new Decimal(1),
      parents: ["23"],
      desc(player){
        let cost = `<br><br> Cost : ${this.cost} Light`
        if (player.brightness.brightnessUpg[this.id] >= 1) cost = ""
        return `Keep Red production time upgrade on prestige
                ${cost}`
      },
      effect(){
        return new Decimal(1)
      },
      state(player){
        return brightnessUpgState(this, player)
      }
    },
    {
      id: "23",
      pos: [0.5, 250],
      name: "Keep RA",
      cost: new Decimal(1),
      parents: ["11"],
      desc(player){
        let cost = `<br><br> Cost : ${this.cost} Light`
        if (player.brightness.brightnessUpg[this.id] >= 1) cost = ""
        return `Keep Red automation mode upgrade on prestige
                ${cost}`
      },
      effect(){
        return new Decimal(1)
      },
      state(player){
        return brightnessUpgState(this, player)
      }
    },
    {
      id: "24",
      pos: [0.7, 250],
      name: "Keep RM",
      cost: new Decimal(1),
      parents: ["23"],
      desc(player){
        let cost = `<br><br>Cost : ${this.cost} Light`
        if (player.brightness.brightnessUpg[this.id] >= 1) cost = ""
        return `Keep Red multiplier upgrade on prestige
                ${cost}`
      },
      effect(){
        return new Decimal(1)
      },
      state(player){
        return brightnessUpgState(this, player)
      }
    },
    {
      id: "25",
      pos: [0.9, 250],
      name: "Br -> R",
      cost: new Decimal(1),
      parents: ["11"],
      desc(player){
        let cost = `<br><br>Cost : ${this.cost} Light`
        if (player.brightness.brightnessUpg[this.id] >= 1) cost = ""
        return `Multiplier to Red based on number of times brightened<br><br>
                Currently: x${format.num(this.effect(player), 2)}
                ${cost}`
      },
      effect(player){
        return (player.stats.brightness.resets)**0.5 + 1
      },
      state(player){
        return brightnessUpgState(this, player)
      }
    },
    {
      id: "31",
      pos: [0.1, 400],
      name: "T -> G",
      cost: new Decimal(1),
      parents: ["21"],
      desc(player){
        let cost = `<br><br> Cost : ${this.cost} Light`
        if (player.brightness.brightnessUpg[this.id] >= 1) cost = ""
        return `Multiplier to Green based on time spent in current brighten<br><br>
                Currently: x${format.num(this.effect(player), 2)}
                ${cost}`
      },
      effect(player){
        return Math.log10(player.stats.brightness.currentTime + 1)/1.5 + 1
      },
      state(player){
        return brightnessUpgState(this, player)
      }
    },
    {
      id: "32",
      pos: [0.3, 400],
      name: "Keep GP",
      cost: new Decimal(1),
      parents: ["22", "33"],
      desc(player){
        let cost = `<br><br> Cost : ${this.cost} Light`
        if (player.brightness.brightnessUpg[this.id] >= 1) cost = ""
        return `Keep Green production time upgrade on prestige
                ${cost}`
      },
      effect(){
        return new Decimal(1)
      },
      state(player){
        return brightnessUpgState(this, player)
      }
    },
    {
      id: "33",
      pos: [0.5, 400],
      name: "Keep GA",
      cost: new Decimal(1),
      parents: ["23"],
      desc(player){
        let cost = `<br><br> Cost : ${this.cost} Light`
        if (player.brightness.brightnessUpg[this.id] >= 1) cost = ""
        return `Keep Green automation mode upgrade on prestige
                ${cost}`
      },
      effect(){
        return new Decimal(1)
      },
      state(player){
        return brightnessUpgState(this, player)
      }
    },
    {
      id: "34",
      pos: [0.7, 400],
      name: "Keep GM",
      cost: new Decimal(1),
      parents: ["24", "33"],
      desc(player){
        let cost = `<br><br>Cost : ${this.cost} Light`
        if (player.brightness.brightnessUpg[this.id] >= 1) cost = ""
        return `Keep Green multiplier upgrade on prestige
                ${cost}`
      },
      effect(){
        return new Decimal(1)
      },
      state(player){
        return brightnessUpgState(this, player)
      }
    },
    {
      id: "35",
      pos: [0.9, 400],
      name: "Br -> G",
      cost: new Decimal(1),
      parents: ["25"],
      desc(player){
        let cost = `<br><br>Cost : ${this.cost} Light`
        if (player.brightness.brightnessUpg[this.id] >= 1) cost = ""
        return `Multiplier to Green based on number of times brightened<br><br>
                Currently: x${format.num(this.effect(player), 2)}
                ${cost}`
      },
      effect(player){
        return (player.stats.brightness.resets)**0.5 + 1
      },
      state(player){
        return brightnessUpgState(this, player)
      }
    }
  ]
}

export default gameData
