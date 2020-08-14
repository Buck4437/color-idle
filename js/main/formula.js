const formula = {
  gain:{
    color: [
      function (){
        let base = 1

        let multi = 1
        multi *= formula.colorEffect[1]()
        multi *= formula.colorEffect[2]()
        multi *= player.colorUpg.hasOwnProperty("12") ? formula.cUpg["12"](player.colorUpg["12"]).effect : 1

        let amount = base * multi

        let speed = 1 //increase = faster, decrease = slower
        speed *= player.colorUpg.hasOwnProperty("11") ? formula.cUpg["11"](player.colorUpg["11"]).effect : 1
        speed *= player.color[0].auto ? formula.cUpg["13"]().effect : 1

        return {base, multi, amount, speed}
      },
      function (red){
        if (red === undefined) red = player.color[0].amount
        if (red < player.color[1].requirement) red = 0

        let base = red/player.color[1].requirement

        let multi = 1
        multi *= formula.colorEffect[2]()
        multi *= player.colorUpg.hasOwnProperty("22") ? formula.cUpg["22"](player.colorUpg["22"]).effect : 1

        let amount = base * multi

        let speed = 1
        speed *= player.colorUpg.hasOwnProperty("21") ? formula.cUpg["21"](player.colorUpg["21"]).effect : 1
        speed *= player.color[1].auto ? formula.cUpg["23"]().effect : 1

        return {base, multi, amount, speed}
      },
      function (green){
        if (green === undefined) green = player.color[1].amount
        if (green < player.color[1].requirement) green = 0

        let base = green/player.color[2].requirement
        if (base < 1) base = 0

        let multi = 1
        multi *= player.colorUpg.hasOwnProperty("32") ? formula.cUpg["32"](player.colorUpg["32"]).effect : 1

        let amount = base * multi

        let speed = 1
        speed *= player.colorUpg.hasOwnProperty("31") ? formula.cUpg["31"](player.colorUpg["31"]).effect : 1
        speed *= player.color[2].auto ? formula.cUpg["33"]().effect : 1

        return {base, multi, amount, speed}
      }
    ]
  },
  colorEffect:[
    function (){
      return 1
    },
    function (){
      let effect = 1
      effect *= Math.log10(10*player.color[1].highest + 1)**4 + 1
      return effect
    },
    function (){
      let effect = 1
      effect *= Math.log10(10*player.color[2].highest + 1)**4 + 1
      return effect
    }
  ],
  cUpg: {
    11(tier){
      if (tier === undefined) tier = 0
      let cost = colorUpgInfo["11"].baseCost * (colorUpgInfo["11"].scaling ** tier)

      let effect = 1.25**tier // reduce 20% timer = x1.25 faster
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

      let effect = 0.25
      return {cost, effect}
    },
    21(tier){
      if (tier === undefined) tier = 0
      let cost = colorUpgInfo["21"].baseCost * (colorUpgInfo["21"].scaling ** tier)

      let effect = 1.25**tier // reduce 20% timer = x1.25 faster
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

      let effect = 0.25
      return {cost, effect}
    },
    31(tier){
      if (tier === undefined) tier = 0
      let cost = colorUpgInfo["31"].baseCost * (colorUpgInfo["31"].scaling ** tier)

      let effect = 1.25**tier // reduce 20% timer = x1.25 faster
      return {cost, effect}
    },
    32(tier){
      if (tier === undefined) tier = 0
      let cost = colorUpgInfo["32"].baseCost * (colorUpgInfo["32"].scaling ** tier)

      let effect = 1.5**tier
      return {cost, effect}
    },
    33(){
      let cost = colorUpgInfo["33"].cost

      let effect = 0.25
      return {cost, effect}
    }
  }
}
