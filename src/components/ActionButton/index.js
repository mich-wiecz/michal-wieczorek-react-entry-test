import React from 'react'
import './ActionButton.scss'

class ActionButton extends React.Component {
  render() {
    const { className = '', children, ...props } = this.props
    return (
      <button className={`action-btn ${className}`} {...props}>
        {children}
      </button>
    )
  }
}

export default ActionButton
