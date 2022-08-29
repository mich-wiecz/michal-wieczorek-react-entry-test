export function classNames(...classes) {
  const result = []
  let lastStdClassIndex = -1

  const invalidClasses = ['undefined', 'null', 'false']

  for (let className of classes) {
    if (
      !className ||
      typeof className !== 'string' ||
      invalidClasses.includes(className)
    ) {
      continue
    }

    className = String(className)

    const prefix = className.slice(0, 2)

    if (prefix === '__') {
      if (lastStdClassIndex !== -1) {
        result[lastStdClassIndex] = result[lastStdClassIndex] + className
      }
    } else if (prefix === '_|') {
      const baseClass = className.slice(2)
      if (lastStdClassIndex !== -1) {
        result[lastStdClassIndex] = result[lastStdClassIndex] + '__' + baseClass
      }
      lastStdClassIndex = result.push(baseClass) - 1
    } else if (prefix === '--' && lastStdClassIndex !== -1) {
      result.push(result[lastStdClassIndex] + className)
    } else {
      lastStdClassIndex = result.push(className) - 1
    }
  }

  return result.join(' ')
}

classNames.setParentClass = function (parentClass) {
  const child = (...classes) => classNames(parentClass, ...classes)
  const raw = classNames
  child.raw = raw
  return child
}
