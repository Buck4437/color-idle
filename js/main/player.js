const defaultPlayer = function (){
  return {
    color:[
      {
        amount: new Decimal(0),
        gainOnReset: new Decimal(0),
        timer: new Decimal(0),
        auto: false,
        highest: new Decimal(0),
        isUnlocked: true,
        isUnlockedUpgrade: false,
      },
      {
        amount: new Decimal(0),
        gainOnReset: new Decimal(0),
        timer: new Decimal(0),
        auto: false,
        highest: new Decimal(0),
        isUnlocked: false,
        isUnlockedUpgrade: false,
      },
      {
        amount: new Decimal(0),
        gainOnReset: new Decimal(0),
        timer: new Decimal(0),
        auto: false,
        highest: new Decimal(0),
        isUnlocked: false,
        isUnlockedUpgrade: false,
      }
    ],
    colorUpg: {},
    stats:{
      playTime: 0
    },
    options:{
      theme: 0
    },
    version: 0,
    lastUpdateTick: Date.now()
  }
}

var player = defaultPlayer()

options.load()
