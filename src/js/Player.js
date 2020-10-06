import Decimal from '../lib/break_infinity.min.js'

export default function(){
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
    colorUpg: {
      11: 0,
      12: 0,
      13: 0,
      21: 0,
      22: 0,
      23: 0,
      31: 0,
      32: 0,
      33: 0,
      34: 0
    },
    brightness: {
      light: new Decimal(0),
      auto:{
        isToggled: false,
        mode: 0,
        value: "0"
      },
      brightnessUpg: {
        11: 0,
        12: 0,
        21: 0,
        22: 0,
        23: 0,
        24: 0,
        25: 0,
        31: 0,
        32: 0,
        33: 0,
        34: 0,
        35: 0,
        41: 0,
        42: 0,
        43: 0,
        44: 0,
        45: 0,
        46: 0,
        51: 0,
        52: 0,
        53: 0
      }
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
      colorScaling: false,
      brightness: {
        isUnlocked: false
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
