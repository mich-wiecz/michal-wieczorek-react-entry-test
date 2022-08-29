import React from 'react'
import PropTypes from 'prop-types'
import { classNames as c } from '@Utils'
import './CurrenciesDropdown.scss'

class CurrencyItem extends React.Component {
  constructor(props) {
    super(props)

    this.currency = React.createRef()
  }

  componentDidUpdate(prev) {
    if (!prev.focused && this.props.focused) {
      this.currency.current.focus()
    }
  }

  render() {
    const {
      className,
      current,
      symbol,
      label,
      focused,
      onCurrencyChange,
      ...props
    } = this.props

    return (
      <button
        ref={this.currency}
        role='menuitemradio'
        aria-checked={current === symbol}
        autoFocus={focused}
        className={c('currency', current === symbol && '--current', className)}
        onClick={() => onCurrencyChange(symbol)}
        {...props}
      >
        <p className={c('currency__content')}>
          <span className={c('currency__symbol')}>{symbol}</span>
          <span className={c('currency__divider')} aria-hidden></span>
          <span className={c('currency__label')}>{label}</span>
        </p>
      </button>
    )
  }
}

CurrencyItem.propTypes = {
  current: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  focused: PropTypes.bool,
  onCurrencyChange: PropTypes.func,
}

export default CurrencyItem
