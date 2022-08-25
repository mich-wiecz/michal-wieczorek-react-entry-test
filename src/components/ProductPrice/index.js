import React from 'react'
import { connect } from 'react-redux'
import { getPrice } from '@Utils'
import './ProductPrice.scss'

class ProductPrice extends React.Component {
  render() {
    const {
      className = '',
      price,
      prices,
      variant,
      currency,
      ...props
    } = this.props
    const amount =
      typeof price === 'number' ? price : getPrice(prices, currency).amount

    return (
      <div
        className={`product-price product-price--${variant} ${className}`}
        {...props}
      >
        <span>{currency}</span>
        <span>{amount}</span>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currency: state.user.currency,
})

export default connect(mapStateToProps, {})(ProductPrice)
