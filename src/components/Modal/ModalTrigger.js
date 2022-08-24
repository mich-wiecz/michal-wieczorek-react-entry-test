import React from 'react'
import { connect } from 'react-redux'
import { showModal, updatePosition } from '@/app/modalSlice'
import { capitalize } from '@Utils'

class ModalTrigger extends React.Component {
  calculateModalPosition(position, element) {
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

  getEventsListeners() {
    const { events, element, modalPosition, showModal, name } = this.props

    const position = this.calculateModalPosition(modalPosition, element)
    return events.reduce((result, eventType) => {
      return {
        ...result,
        [`on${capitalize(eventType)}`]: (e) => {
          if (e.type === 'click') {
            e.stopPropagation()
          }
          showModal({ name, position })
        },
      }
    }, {})
  }

  updatePositionOnResize() {
    const { element, modalPosition, modal, name, updatePosition } = this.props
    if (
      !modal ||
      modal !== name ||
      !modalPosition ||
      typeof modalPosition === 'object'
    ) {
      return
    }

    updatePosition(this.calculateModalPosition(modalPosition, element))
  }

  componentDidMount() {
    window.addEventListener('resize', this.updatePositionOnResize.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updatePositionOnResize.bind(this))
  }

  render() {
    const { children } = this.props
    return <div {...this.getEventsListeners()}>{children}</div>
  }
}

const mapStateToProps = (state) => ({
  modal: state.modal.name,
})
const mapDispatchToProps = { showModal, updatePosition }
export default connect(mapStateToProps, mapDispatchToProps)(ModalTrigger)
