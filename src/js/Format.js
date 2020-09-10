import Decimal from '../lib/break_infinity.min.js'

//ask stackoverflow
function toFixedTrunc(x, n) {
  const v = (typeof x === 'string' ? x : x.toString()).split('.');
  if (n <= 0) return v[0];
  let f = v[1] || '';
  if (f.length > n) return `${v[0]}.${f.substr(0,n)}`;
  while (f.length < n) f += '0';
  return `${v[0]}.${f}`
}

function div(x, y){
  return (x - x % y)/y
}

let Format = {
  // default: dpNorm at 0, dpSci at 2, useNormUnder at 1000
  num(num, dpNorm, dpSci, useNormUnder){
    if (typeof num === "number") num = new Decimal(num)
    if(!isFinite(dpNorm)) dpNorm = 0
    if(!isFinite(dpSci)) dpSci = 2
    if (!isFinite(useNormUnder)) useNormUnder = 1000
    if(num.lt(useNormUnder)) return toFixedTrunc(num.toNumber(), dpNorm)
    return toFixedTrunc(num.mantissa, dpSci) + "e" + num.exponent
  },
  //default: precisionMode (p): false
  date(s, p){
    if (s === undefined) return "Unknown"
    if (p === undefined || s > 10) p = false
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
}

export default Format
