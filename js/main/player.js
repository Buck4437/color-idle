const defaultPlayer = function (){
  return {
    color:[
      {
        amount: new Decimal(0),
        gainOnReset: new Decimal(0),
        timer: new Decimal(0),
        auto: false,
        highest: new Decimal(0)
      },
      {
        amount: new Decimal(0),
        gainOnReset: new Decimal(0),
        timer: new Decimal(0),
        auto: false,
        highest: new Decimal(0)
      },
      {
        amount: new Decimal(0),
        gainOnReset: new Decimal(0),
        timer: new Decimal(0),
        auto: false,
        highest: new Decimal(0)
      }
    ],
    colorUpg: {},
    brightness:{
      light: new Decimal(0)
    },
    unlocks:{
      color:[
        {
          color: true,
          upgrade: false
        },
        {
          color: false,
          upgrade: false
        },
        {
          color: false,
          upgrade: false
        }
      ],
      brightness: {
        light: false
      }
    },
    stats:{
      playTime: 0,
      brightness:{
        resets: 0,
        currentTime: 0,
        fastestTime: 1e20,
      }
    },
    options:{
      theme: 0,
      confirmation:{
        brighten: true
      }
    },
    version: 1,
    lastUpdateTick: Date.now()
  }
}

var player = defaultPlayer()

options.load()
