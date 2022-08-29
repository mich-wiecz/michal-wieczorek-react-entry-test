import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '@Utils'
import { connect } from 'react-redux'
import { getPrice } from '@Utils'
import './ProductPrice.scss'

class ProductPrice extends React.Component {
  render() {
    const { className, price, prices, variant, currency, ...props } = this.props
    const amount =
      typeof price === 'number' ? price : getPrice(prices, currency).amount

    const c = classNames.setParentClass('product-price')

    return (
      <div className={c('--' + variant, className)} {...props}>
        <span>{currency}</span>
        <span>{amount.toFixed(2)}</span>
      </div>
    )
  }
}

ProductPrice.propTypes = {
  price: PropTypes.number,
  prices: PropTypes.arrayOf(PropTypes.object),
  variant: PropTypes.string,
  currency: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  currency: state.user.currency,
})

export default connect(mapStateToProps, {})(ProductPrice)
