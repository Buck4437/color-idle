var player = {
  color:[
    {
      amount: 0,
      gainOnReset: 0,
      requirement: 0,
      timer: 0,
      auto: false,
      highest: 0,
      isUnlocked: true
    },
    {
      amount: 0,
      gainOnReset: 0,
      requirement: 1000,
      timer: 0,
      auto: false,
      highest: 0,
      isUnlocked: false
    },
    {
      amount: 0,
      gainOnReset: 0,
      requirement: 1000,
      timer: 0,
      auto: false,
      highest: 0,
      isUnlocked: false
    }
  ],
  colorUpg: {},
  lastUpdateTick: Date.now()
}
