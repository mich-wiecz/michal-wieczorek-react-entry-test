import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '@Utils'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { hideModal, hideOtherModals } from '@/app/modalSlice'
import {
  applyFocusTrap,
  removeFocusTrap,
  focusFirstFocusableChild,
} from '@Utils'
import './Modal.scss'

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOn: false,
      mounted: false,
      active: false,
      modalPosition: null,
    }

    this.modal = React.createRef()
  }

  handleClickOutside() {
    const { name, hideModal, type = 'dialog' } = this.props

    hideModal(type === 'modal' && name)
  }

  handleKeydown(e) {
    if (e.key !== 'Escape') return
    const { name, hideModal, type = 'dialog' } = this.props
    hideModal(type === 'modal' && name)
  }

  calculateModalPosition() {
    const { element, position } = this.props
    if (!position) {
      return null
    }

    if (typeof position === 'object') {
      return position
    }

    return element
      ? position({
          ...JSON.parse(JSON.stringify(element.getBoundingClientRect())),
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight,
        })
      : null
  }

  updateModalPosition() {
    this.setState(() => ({
      modalPosition: this.calculateModalPosition(),
    }))
  }

  showModal() {
    this.setState(
      () => ({ isOn: true }),
      () => {
        setTimeout(() => {
          this.setState(() => ({ active: true }))
        }, 1)
        focusFirstFocusableChild(this.modal.current)
        applyFocusTrap(this.modal.current)
      }
    )
    this.updateModalPosition()
  }

  closeModal() {
    this.setState(
      () => ({
        active: false,
      }),
      () => {
        setTimeout(() => {
          this.setState(() => ({ isOn: false }))
        }, 400)
      }
    )

    removeFocusTrap(this.modal.current)
  }

  componentDidMount() {
    this.setState({
      mounted: true,
      modalPosition: this.calculateModalPosition(),
    })

    if (this.props.currModals.includes(this.props.name)) {
      this.showModal()
    }

    window.addEventListener('click', this.handleClickOutside.bind(this))
    window.addEventListener('keydown', this.handleKeydown.bind(this))
    window.addEventListener('resize', this.updateModalPosition.bind(this))
  }

  componentDidUpdate(prev) {
    const wasOn = prev.currModals.includes(prev.name)
    const isOn = this.props.currModals.includes(this.props.name)

    if (!wasOn && isOn) {
      this.showModal()
    }

    if (wasOn && !isOn) {
      this.closeModal()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClickOutside.bind(this))
    window.removeEventListener('keydown', this.handleKeydown.bind(this))
    window.removeEventListener('resize', this.updateModalPosition.bind(this))
  }

  render() {
    const {
      className,
      name,
      currModals,
      type,
      children,
      backdrop = true,
      transition = false,
      hideOtherModals,
      hideModal,
      position,
      ...props
    } = this.props

    const { modalPosition, mounted, active, isOn } = this.state

    if (!mounted || !isOn) {
      return null
    }

    const c = classNames.setParentClass('modal')

    return ReactDOM.createPortal(
      <>
        <div
          className={c(
            '__background',
            !backdrop && 'disabled',
            transition && 'transition',
            active && 'active'
          )}
          aria-hidden
        />
        <div
          role='dialog'
          ref={this.modal}
          className={c(
            transition && 'transition',
            active && 'active',
            className
          )}
          style={modalPosition}
          onClick={(e) => {
            if (type === 'modal' && currModals.length > 1) {
              hideOtherModals(name)
            }
            e.stopPropagation()
          }}
          {...props}
        >
          {children}
        </div>
      </>,
      document.getElementById('layout')
    )
  }
}

Modal.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['modal', 'dialog']),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  backdrop: PropTypes.bool,
  transition: PropTypes.bool,
  position: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  currModals: PropTypes.arrayOf(PropTypes.string).isRequired,
  hideModal: PropTypes.func.isRequired,
  hideOtherModals: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  currModals: state.modal.current,
})
const mapDispatchToProps = { hideModal, hideOtherModals }
export default connect(mapStateToProps, mapDispatchToProps, null)(Modal)
