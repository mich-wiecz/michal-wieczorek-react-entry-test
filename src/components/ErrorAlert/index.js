import React from 'react'
import PropTypes from 'prop-types'
import './ErrorAlert.scss'

class ErrorAlert extends React.Component {
  render() {
    const { children, className = '', ...props } = this.props

    return (
      <p role='alert' className={`error-alert ${className}`} {...props}>
        {children}
      </p>
    )
  }
}

ErrorAlert.propTypes = {
  children: PropTypes.element,
}

export default ErrorAlert
