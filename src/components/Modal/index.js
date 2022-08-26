import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { hideModal, hideOtherModals } from '@/app/modalSlice'
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
  }

  handleClickOutside() {
    const {
      name,
      hideModal,
      transition = false,
      disruptive = false,
    } = this.props

    if (!transition) {
      return hideModal()
    }

    hideModal(disruptive && name)
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
    window.removeEventListener('resize', this.updateModalPosition.bind(this))
  }

  render() {
    const {
      className = '',
      name,
      currModals,
      disruptive,
      children,
      backdrop = true,
      transition = false,
      hideOtherModals,
    } = this.props

    const { modalPosition, mounted, active, isOn } = this.state

    if (!mounted || !isOn) {
      return null
    }

    return ReactDOM.createPortal(
      <>
        <div
          className={`modal__background ${
            !backdrop ? 'modal__background--disabled' : ''
          } ${transition ? 'transition' : ''} ${active ? 'active' : ''}`}
        />
        <div
          className={`${className} modal ${transition ? 'transition' : ''} ${
            active ? 'active' : ''
          }`}
          data-modal={name}
          style={modalPosition}
          onClick={(e) => {
            if (disruptive && currModals.length > 1) {
              hideOtherModals(name)
            }
            e.stopPropagation()
          }}
        >
          {children}
        </div>
      </>,
      document.getElementById('layout')
    )
  }
}

const mapStateToProps = (state) => ({
  currModals: state.modal.current,
})
const mapDispatchToProps = { hideModal, hideOtherModals }
export default connect(mapStateToProps, mapDispatchToProps, null)(Modal)
