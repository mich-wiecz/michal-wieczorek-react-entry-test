import React from 'react'
import { connect } from 'react-redux'
import { showModal } from '@/app/modalSlice'
import { capitalize } from '@Utils'

class ModalTrigger extends React.Component {
  getEventsListeners() {
    const { events, showModal, name, type = 'dialog' } = this.props

    return events.reduce((result, eventType) => {
      return {
        ...result,
        [`on${capitalize(eventType)}`]: (e) => {
          if (eventType === 'keyDown' && e.key !== 'Enter') {
            return
          }
          e.stopPropagation()
          showModal({ name, isDisruptive: type === 'modal' })
        },
      }
    }, {})
  }

  render() {
    const { children } = this.props
    return <div {...this.getEventsListeners()}>{children}</div>
  }
}

const mapDispatchToProps = { showModal }
export default connect(() => ({}), mapDispatchToProps)(ModalTrigger)
