const formula = {
  gain:{
    color: [
      function (){
        let base = new Decimal(1)

        let multi = new Decimal(1)
                    .times(formula.colorEffect[1]())
                    .times(formula.colorEffect[2]())
                    .times(player.colorUpg.hasOwnProperty("12") ? formula.cUpg["12"](player.colorUpg["12"]).effect : 1)

        let amount = base.times(multi)

        let speed = new Decimal(1) //increase = faster, decrease = slower
                    .times(player.colorUpg.hasOwnProperty("11") ? formula.cUpg["11"](player.colorUpg["11"]).effect : 1)
                    .times(player.color[0].auto ? formula.cUpg["13"]().effect : 1)

        return {base, multi, amount, speed}
      },
      function (red){
        if (red === undefined) red = player.color[0].amount
        if (red.equals(0)) red = new Decimal(1) // because of Math.log10(red)

        let base = new Decimal(1)
            base = Decimal.pow(10, Decimal.log10(red)/3-1)
        if (red.lt(1000)) base = new Decimal(0)

        let multi = new Decimal(1)
                    .times(formula.colorEffect[2]())
                    .times(player.colorUpg.hasOwnProperty("22") ? formula.cUpg["22"](player.colorUpg["22"]).effect : 1)

        let amount = base.times(multi)

        let speed = new Decimal(1)
                    .times(player.colorUpg.hasOwnProperty("21") ? formula.cUpg["21"](player.colorUpg["21"]).effect : 1)
                    .times(player.color[1].auto ? formula.cUpg["23"]().effect : 1)

        return {base, multi, amount, speed}
      },
      function (green){
        if (green === undefined) green = player.color[1].amount
        if (green.equals(0)) green = new Decimal(1) // because of Math.log10(green)

        let base = new Decimal(1)
            base = Decimal.pow(10, Decimal.log10(green)/3-1)
        if (green.lt(1000)) base = new Decimal(0)

        let multi = new Decimal(1)
                    .times(player.colorUpg.hasOwnProperty("32") ? formula.cUpg["32"](player.colorUpg["32"]).effect : 1)

        let amount = base.times(multi)

        let speed = new Decimal(1)
                    .times(player.colorUpg.hasOwnProperty("31") ? formula.cUpg["31"](player.colorUpg["31"]).effect : 1)
                    .times(player.color[2].auto ? formula.cUpg["34"]().effect : 1)

        return {base, multi, amount, speed}
      }
    ]
  },
  colorEffect:[
    function (){
      return new Decimal(1)
    },
    function (){
      let effect = new Decimal(1)
                  .times(player.color[1].highest.times(2.5).plus(1).pow(0.8)) //(2.5x+1)^0.8

      return effect
    },
    function (){
      let effect = new Decimal(1)
                  .times(player.color[2].highest.times(2.5).plus(1).pow(0.8)) //(2.5x+1)^0.8
      return effect
    }
  ],
  cUpg: {
    11(tier){
      if (tier === undefined) tier = 0
      let cost = colorUpgInfo["11"].baseCost * (colorUpgInfo["11"].scaling ** tier)

      let effect = 1.25**tier // reduce 20% timer = x1.25 faster
      if (tier >= colorUpgInfo["11"].cap) effect = 10 //set the production time to 0.10s
      return {cost, effect}
    },
    12(tier){
      if (tier === undefined) tier = 0
      let cost = colorUpgInfo["12"].baseCost * (colorUpgInfo["12"].scaling ** tier)

      let effect = 1.5**tier
      return {cost, effect}
    },
    13(){
      let cost = colorUpgInfo["13"].cost

      let effect = 0.50
          effect += player.colorUpg.hasOwnProperty("33") ? formula.cUpg["33"](player.colorUpg["33"]).effect : 0

      return {cost, effect}
    },
    21(tier){
      if (tier === undefined) tier = 0
      let cost = colorUpgInfo["21"].baseCost * (colorUpgInfo["21"].scaling ** tier)

      let effect = 1.25**tier // reduce 20% timer = x1.25 faster
      if (tier >= colorUpgInfo["21"].cap) effect = 10
      return {cost, effect}
    },
    22(tier){
      if (tier === undefined) tier = 0
      let cost = colorUpgInfo["22"].baseCost * (colorUpgInfo["22"].scaling ** tier)

      let effect = 1.5**tier
      return {cost, effect}
    },
    23(){
      let cost = colorUpgInfo["23"].cost

      let effect = 0.50
      return {cost, effect}
    },
    31(tier){
      if (tier === undefined) tier = 0
      let cost = colorUpgInfo["31"].baseCost * (colorUpgInfo["31"].scaling ** tier)

      let effect = 1.25**tier // reduce 20% timer = x1.25 faster
      if (tier >= colorUpgInfo["31"].cap) effect = 10
      return {cost, effect}
    },
    32(tier){
      if (tier === undefined) tier = 0
      let cost = colorUpgInfo["32"].baseCost * (colorUpgInfo["32"].scaling ** tier)

      let effect = 1.5**tier
      return {cost, effect}
    },
    33(tier){
      if (tier === undefined) tier = 0
      let cost = colorUpgInfo["33"].baseCost * (colorUpgInfo["33"].scaling ** tier)

      let effect = 0.25*tier
      return {cost, effect}
    },
    34(){
      let cost = colorUpgInfo["34"].cost

      let effect = 0.50
      return {cost, effect}
    }
  }
}
