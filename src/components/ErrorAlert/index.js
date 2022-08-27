import React from 'react'
import './ErrorAlert.scss'

class ErrorAlert extends React.Component {
  render() {
    const { children, className = '', ...props } = this.props
    return (
      <p
        aria-label='alert-error'
        className={`error-alert ${className}`}
        {...props}
      >
        {children}
      </p>
    )
  }
}

export default ErrorAlert
