import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.scss'

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mounted: false,
      active: false,
      windowWidth: 0,
      windowHeight: 0,
    }

    this.modal = React.createRef()
  }

  handleClickOutside() {
    const { onClose, transition = false } = this.props

    if (!transition) {
      return onClose()
    }

    this.setState(
      () => ({
        active: false,
      }),
      () => {
        setTimeout(() => {
          onClose()
        }, 400)
      }
    )
  }

  handleWindowResize() {
    this.setState(() => ({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    }))
  }

  getPositions() {
    const {
      relativePositions = null,
      element,
      minWidth,
      minHeight,
    } = this.props

    const positions = {
      top: 'auto',
      bottom: 'auto',
      left: 'auto',
      right: 'auto',
    }

    if (!element || !element.current || !relativePositions) {
      return {
        ...positions,
        top: '80px',
        left: `calc(50% - ${minWidth / 2}px)`,
      }
    }

    const { top, bottom, left, right } = element.current.getBoundingClientRect()

    const { horizontal, vertical } = relativePositions

    if (horizontal === 'left') {
      positions.left = `${left - minWidth}px`
    } else if (horizontal === 'right') {
      positions.left = `${right - minWidth}px`
    } else {
      positions.left = `calc(50% - ${minWidth / 2}px)`
    }

    if (vertical === 'top') {
      positions.top = `${top - minHeight}px`
    } else if (vertical === 'bottom') {
      positions.top = `${bottom}px`
    } else {
      positions.top = '80px'
    }

    return positions
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      mounted: true,
    })

    window.addEventListener('click', this.handleClickOutside.bind(this))

    window.addEventListener('resize', this.handleWindowResize.bind(this))

    setTimeout(() => {
      this.setState(() => ({ active: true }))
    }, 1)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClickOutside.bind(this))

    window.removeEventListener('resize', this.handleWindowResize.bind(this))
  }

  render() {
    const {
      className,
      children,
      backdrop = true,
      transition = false,
    } = this.props

    if (!this.state.mounted) {
      return null
    }

    return ReactDOM.createPortal(
      <>
        <div
          className={`modal__background ${
            !backdrop ? 'modal__background--disabled' : ''
          } ${className} ${transition ? 'transition' : ''} ${
            this.state.active ? 'active' : ''
          }`}
        />
        <div
          ref={this.modal}
          className={`${className} modal ${transition ? 'transition' : ''} ${
            this.state.active ? 'active' : ''
          }`}
          style={{ ...this.getPositions() }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </>,
      document.getElementById('root')
    )
  }
}

export default Modal
