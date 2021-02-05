export const formatNumber = (val: string, digits = 4) => {
  const n = Number(val)
  return Number.isInteger(n) ? n : parseFloat(n.toFixed(digits))
}
