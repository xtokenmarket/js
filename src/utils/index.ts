export const formatNumber = (val: string, digits = 4) => {
  const n = Number(val)
  return Number.isInteger(n) ? n : parseFloat(n.toFixed(digits))
}

export const formatNumberWithCommas = (val: string) => {
  if (Number(val) < 1000) return val
  let formattedNumber = Number(val)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
  const splitArray = formattedNumber.split('.')
  if (splitArray.length > 1) {
    formattedNumber = splitArray[0]
  }
  return formattedNumber
}
