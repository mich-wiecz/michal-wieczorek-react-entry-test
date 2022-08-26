export default class ClassNames {
  constructor(parentClass) {
    this.parentClass = parentClass
  }

  setParentClass(parentClass) {
    if (parentClass && typeof String(parentClass) === 'string') {
      this.parentClass = parentClass
    }
  }

  filterClasses(classes) {
    return classes.filter((className) => {
      const classType = typeof className
      return className && (classType === 'string' || classType === 'number')
    })
  }

  combineClasses(classes) {
    let stdClass = '',
      modifierClass = '',
      isModifier = false

    for (let i = 0; i < classes.length; i++) {
      const name = String(classes[i])

      if (name[0] === '-' && name[1] === '-') {
        isModifier = true
        modifierClass += name
        continue
      }

      if (!isModifier) {
        stdClass += (i === 0 ? '' : '__') + name
        modifierClass += (i === 0 ? '' : '__') + name
      }
    }

    return stdClass + (isModifier ? ' ' + modifierClass : '')
  }

  raw(...classes) {
    return this.filterClasses(classes).join(' ')
  }

  join(...classes) {
    return this.combineClasses(this.filterClasses(classes))
  }

  child(...classes) {
    return this.join(this.parentClass, ...classes)
  }

  modifier(className, isValid = true) {
    if (!isValid) return
    return '--' + String(className)
  }
}
