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

  getPosition() {
    const { relativePosition, position } = this.props

    if (position) {
      return position
    }

    if (!relativePosition) {
      return {
        top: 0,
        left: '50%',
      }
    }
    return relativePosition
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      mounted: true,
    })

    window.addEventListener('click', this.handleClickOutside.bind(this))
  }

  componentDidUpdate(prev) {
    const wasOn = prev.currModal === prev.name
    const isOn = this.props.currModal === this.props.name

    if (!wasOn && isOn) {
      setTimeout(() => {
        this.setState(() => ({ active: true }))
      }, 1)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClickOutside.bind(this))
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

    if (!this.state.mounted || name !== currModal) {
      return null
    }

    return ReactDOM.createPortal(
      <>
        <div
          className={`modal__background ${
            !backdrop ? 'modal__background--disabled' : ''
          } ${transition ? 'transition' : ''} ${
            this.state.active ? 'active' : ''
          }`}
        />
        <div
          className={`${className} modal ${transition ? 'transition' : ''} ${
            this.state.active ? 'active' : ''
          }`}
          style={this.getPosition()}
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
  relativePosition: state.modal.position,
})
const mapDispatchToProps = { hideModal }
export default connect(mapStateToProps, mapDispatchToProps, null)(Modal)
