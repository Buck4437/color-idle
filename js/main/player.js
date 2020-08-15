var player = {
  color:[
    {
      amount: new Decimal(0),
      gainOnReset: new Decimal(0),
      timer: new Decimal(0),
      auto: false,
      highest: new Decimal(0),
      isUnlocked: true
    },
    {
      amount: new Decimal(0),
      gainOnReset: new Decimal(0),
      timer: new Decimal(0),
      auto: false,
      highest: new Decimal(0),
      isUnlocked: false
    },
    {
      amount: new Decimal(0),
      gainOnReset: new Decimal(0),
      timer: new Decimal(0),
      auto: false,
      highest: new Decimal(0),
      isUnlocked: false
    }
  ],
  colorUpg: {},
  stats:{
    playTime: 0
  },
  lastUpdateTick: Date.now()
}
