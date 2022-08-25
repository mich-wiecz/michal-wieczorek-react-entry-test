import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { hideModal } from '@/app/modalSlice'
import './Modal.scss'

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mounted: false,
      active: false,
      modalPosition: null,
    }
  }

  handleClickOutside() {
    const { hideModal, transition = false } = this.props

    if (!transition) {
      return hideModal()
    }

    this.setState(
      () => ({
        active: false,
      }),
      () => {
        setTimeout(() => {
          hideModal()
        }, 400)
      }
    )
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

  componentDidMount() {
    this.setState({
      ...this.state,
      mounted: true,
      modalPosition: this.calculateModalPosition(),
    })

    window.addEventListener('click', this.handleClickOutside.bind(this))
    window.addEventListener('resize', this.updateModalPosition.bind(this))
  }

  componentDidUpdate(prev) {
    const wasOn = prev.currModal === prev.name
    const isOn = this.props.currModal === this.props.name

    if (!wasOn && isOn) {
      setTimeout(() => {
        this.setState(() => ({ active: true }))
      }, 1)
      this.updateModalPosition()
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
      currModal,
      children,
      backdrop = true,
      transition = false,
    } = this.props

    const { modalPosition, mounted, active } = this.state

    if (!mounted || name !== currModal) {
      return null
    }

    console.log(modalPosition)

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
          style={modalPosition}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </>,
      document.getElementById('layout')
    )
  }
}

const mapStateToProps = (state) => ({
  currModal: state.modal.name,
})
const mapDispatchToProps = { hideModal }
export default connect(mapStateToProps, mapDispatchToProps, null)(Modal)
