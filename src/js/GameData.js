import Decimal from '../lib/break_infinity.min.js'

var gameData = {
  color: [
    //these are placeholders, formula will be added later
    {
      base(){
        return new Decimal(1)
      },
      multi(player){
        let multi = new Decimal(1)
                    .times(gameData.colorUpg["12"].effect(player))
                    .times(gameData.color[1].effect(player))
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
                   //placeholder
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
                   //placeholder
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
  }
}

export default gameData