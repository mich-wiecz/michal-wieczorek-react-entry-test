import React from 'react'
import { connect } from 'react-redux'
import { getPrice } from '@Utils'
import './ProductPrice.scss'

class ProductPrice extends React.Component {
  render() {
    const { className = '', prices, currency, ...props } = this.props

    const { amount, symbol } = getPrice(prices, currency)

    return (
      <div className={`product-price ${className}`} {...props}>
        <span className='product-price__symbol'>{symbol}</span>
        <span className='product-price__amount'>{amount}</span>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currency: state.user.currency,
})

export default connect(mapStateToProps, {})(ProductPrice)
