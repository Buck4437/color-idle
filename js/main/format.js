// default: dp at 0, scidp at 2, showFullIfSmallerThanThis at 1000

function format(num, dp, scidp, showFullIfSmallerThanThis){
  if (typeof num === "number") num = new Decimal(num)
  //ask stackoverflow
  function toFixedTrunc(x, n) {
    const v = (typeof x === 'string' ? x : x.toString()).split('.');
    if (n <= 0) return v[0];
    let f = v[1] || '';
    if (f.length > n) return `${v[0]}.${f.substr(0,n)}`;
    while (f.length < n) f += '0';
    return `${v[0]}.${f}`
  }

  if(!isFinite(dp)||(dp||1) > 50){
    dp = 0
  }
  if(!isFinite(scidp)||(scidp||1) > 50){
    scidp = 2
  }
  if(num.lt(showFullIfSmallerThanThis||1000)){
    return toFixedTrunc(num.toNumber(), dp)
  }else{
    let power = num.exponent
    let mantissa = toFixedTrunc(num.mantissa, scidp)
    return mantissa + "e" + power
  }
}

//default: precisionMode (p): false
function formatDate(s, p){
  if (s === undefined) return "Unknown"
  if (p === undefined) p = false
  if (s > 10) p = false
  let div = function (x, y){
    return (x - x % y)/y
  }
  let y = div(s, 31536000) //365 * 86400
  if (isNaN(y)) return "unknown"
  s -= 31536000 * y
  let d = div(s, 86400)
  s -= 86400 * d
  let h = div(s, 3600)
  s -= 3600 * h
  let m = div (s, 60)
  s -= 60 * m
  if (p){
    s = s.toFixed(3)
  }
  else{
    s = Math.floor(s)
  }
  let string = (y > 0 ? (y != 1 ? y + " years, " : y + " year, ") : "")

             + (d > 0 ? (d != 1 ? d + " days, " : d + " day, ") : "")

             + (h > 0 ? (h != 1 ? h + " hours, " : h + " hour, ") : "")

             + (m > 0 ? (m != 1 ? m + " minutes, " : m + " minute, ") : "")

             + (y + d + h + m > 0 ? "and " : "")

             + (s < 2 && s >= 1 ? s + " second" : s + " seconds")
  return string
}
