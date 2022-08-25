import React from 'react'
import { connect } from 'react-redux'
import { showModal, updatePosition } from '@/app/modalSlice'
import { capitalize } from '@Utils'

class ModalTrigger extends React.Component {
  getEventsListeners() {
    const { events, showModal, name } = this.props

    return events.reduce((result, eventType) => {
      return {
        ...result,
        [`on${capitalize(eventType)}`]: (e) => {
          if (e.type === 'click') {
            e.stopPropagation()
          }
          showModal({ name })
        },
      }
    }, {})
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
