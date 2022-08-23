import React from 'react'
import './ErrorAlert.scss'

class ErrorAlert extends React.Component {
  render() {
    return (
      <p aria-label='alert-error' class='error-alert'>
        {this.props.children}
      </p>
    )
  }
}

export default ErrorAlert
