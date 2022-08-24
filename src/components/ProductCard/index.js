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
      name,
      inStock,
      gallery,
      prices,
      onClick,
    } = this.props
    const { symbol, amount } = getPrice(prices, currency)

    return (
      <div
        role='button'
        className={`${className} product-card ${
          !inStock ? 'product-card--unavailable' : ''
        }`}
        onClick={onClick}
      >
        <div className='product-card__image-container'>
          <img
            src={gallery[0]}
            alt='product-card'
            className='product-card__image'
          />
          <button type='button' className='product-card__add-btn add-btn'>
            <BasketSvg className='add-btn__icon' />
          </button>
          <div className='product-card__unavailable-info'>Out of stock</div>
        </div>

        <h4 className='product-card__name'>{name}</h4>
        <span className='product-card__prize'>
          {symbol}
          {amount}
        </span>
        <div className='product-card__veil' />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currency: state.user.currency,
})

export default connect(mapStateToProps)(ProductCard)
