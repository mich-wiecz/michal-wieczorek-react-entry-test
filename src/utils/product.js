import { areDeepEqual } from '.'

export function getPrice(prices, current) {
  const price = prices.find((price) => price.currency.symbol === current)
  return {
    amount: price.amount,
    label: price.currency.label,
    symbol: current,
  }
}

export function getDefaultAttributes(attributes) {
  if (!attributes) return
  return attributes.reduce((result, { id, items }) => {
    return {
      ...result,
      [id]: items[0].value,
    }
  }, {})
}

function pricesToObject(prices) {
  return prices.reduce((result, { currency, amount }) => {
    return {
      ...result,
      [currency.symbol]: amount,
    }
  }, {})
}

export function arePricesArraysEqual(p1, p2) {
  return areDeepEqual(pricesToObject(p1), pricesToObject(p2))
}

const sizeSymbolToNumber = {
  S: 40,
  M: 41,
  L: 42,
  XL: 43,
}

export function areSizesEqual(s1, s2) {
  const size1 = Number.isNaN(Number(s1)) ? sizeSymbolToNumber[s1] : Number(s1)
  const size2 = Number.isNaN(Number(s2)) ? sizeSymbolToNumber[s2] : Number(s2)

  return size1 === size2
}
