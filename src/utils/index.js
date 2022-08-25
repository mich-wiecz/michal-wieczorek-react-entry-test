export function capitalize(value) {
  return value[0].toUpperCase() + value.slice(1)
}

function isObject(object) {
  return object != null && typeof object === 'object'
}

export function areDeepEqual(object1, object2) {
  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)
  if (keys1.length !== keys2.length) {
    return false
  }
  for (const key of keys1) {
    const val1 = object1[key]
    const val2 = object2[key]
    const areObjects = isObject(val1) && isObject(val2)
    if (
      (areObjects && !areDeepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false
    }
  }
  return true
}

export function getPrice(prices, current) {
  const price = prices.find((price) => price.currency.symbol === current)
  return {
    amount: price.amount,
    symbol: current,
  }
}

export function getDefaultAttributes(attributes) {
  if (!attributes) return
  return attributes.reduce((result, { id, items }) => {
    return {
      ...result,
      [id]: items[0].id,
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
