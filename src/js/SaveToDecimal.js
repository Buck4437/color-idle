import Decimal from '../lib/break_infinity.min.js'

function saveToDecimal(obj, def){
  let data = {}
  if (def instanceof Array) data = []
  for (let key in def){
    if (obj[key] === undefined){
      data[key] = def[key]
    }
    else if(typeof obj[key] === "string" && def[key] instanceof Decimal){
      data[key] = new Decimal(obj[key])
    }
    else if(typeof obj[key] === "object" && typeof def[key] === "object"){
      data[key] = saveToDecimal(obj[key], def[key])
    }
    else if(typeof obj[key] !== typeof def[key]){
      data[key] = def[key]
    }
    else{
      data[key] = obj[key]  
    }
  }
  return data
}

export default saveToDecimal
