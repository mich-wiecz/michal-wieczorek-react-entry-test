export { classNames } from './class-names'
export { throttle } from './throttle'
export {
  getPrice,
  arePricesArraysEqual,
  areSizesEqual,
  getDefaultAttributes,
} from './product'
export {
  applyFocusTrap,
  removeFocusTrap,
  applyInertia,
  removeInertia,
  focusFirstFocusableChild,
} from './focus'

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
