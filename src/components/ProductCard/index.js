import React from 'react'
import { connect } from 'react-redux'
import { getPrice } from '@Utils'
import { ReactComponent as BasketSvg } from '@Images/basket-white.svg'
import './ProductCard.scss'

class ProductCard extends React.Component {
  render() {
    const {
      className = '',
      currency,
      id,
      name,
      inStock,
      gallery,
      prices,
    } = this.props
    const { symbol, amount } = getPrice(prices, currency)

    return (
      <div
        role='button'
        className={`${className} product ${
          !inStock ? 'product--unavailable' : ''
        }`}
      >
        <div className='product__image-container'>
          <img src={gallery[0]} alt='product' className='product__image' />
          <button type='button' className='product__add-btn add-btn'>
            <BasketSvg className='add-btn__icon' />
          </button>
          <div className='product__unavailable-info'>Out of stock</div>
        </div>

        <h4 className='product__name'>{name}</h4>
        <span className='product__prize'>
          {symbol}
          {amount}
        </span>
        <div className='product__veil' />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currency: state.user.currency,
})

export default connect(mapStateToProps)(ProductCard)
