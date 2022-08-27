const focusableElementsSelector =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export function focusFirstFocusableChild(parent) {
  const child = parent.querySelector(focusableElementsSelector)
  child.focus()
}

function trapFocus(e, container) {
  const focusableElements = Array.from(
    container.querySelectorAll(focusableElementsSelector)
  )

  const firstElement = focusableElements[0],
    lastElement = focusableElements[focusableElements.length - 1]

  if (!firstElement) return

  const isTabPressed = e.key === 'Tab' || e.keyCode === 9

  if (!isTabPressed) {
    return
  }

  if (e.shiftKey) {
    if (document.activeElement === firstElement) {
      lastElement.focus()
      e.preventDefault()
    }
  } else {
    if (document.activeElement === lastElement) {
      firstElement.focus()
      e.preventDefault()
    }
  }
}

export function applyFocusTrap(container) {
  document.addEventListener('keydown', (e) => trapFocus(e, container))
}

export function removeFocusTrap(container) {
  console.log('goodbye')
  document.removeEventListener('keydown', (e) => trapFocus(e, container))
}

function changeTabIndexOfChildren(parentSelector, tabIndex) {
  const elem = document.querySelector(parentSelector)
  console.log(elem, parentSelector)
  Array.from(elem.querySelectorAll(focusableElementsSelector)).forEach(
    (child) => child.setAttribute('tabindex', tabIndex)
  )
}

export function applyInertia(selector) {
  changeTabIndexOfChildren(selector, '-1')
}

export function removeInertia(selector) {
  changeTabIndexOfChildren(selector, '0')
}
