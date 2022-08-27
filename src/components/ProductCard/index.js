import React from 'react'
import { connect } from 'react-redux'
import { addItemToCart } from '@/app/userSlice'
import { getPrice, getDefaultAttributes } from '@Utils'
import { ReactComponent as BasketSvg } from '@Images/basket-white.svg'
import ModalTrigger from '@Components/Modal/ModalTrigger'
import './ProductCard.scss'

class ProductCard extends React.Component {
  render() {
    const {
      className = '',
      id,
      name,
      brand,
      inStock,
      gallery,
      prices,
      attributes,
      onClick,
      currency,
      addItemToCart,
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
          <ModalTrigger name='minicart' type='modal' events={['click']}>
            <button
              type='button'
              className='product-card__add-btn add-btn'
              onClick={() =>
                addItemToCart({
                  id,
                  prices,
                  attributes: getDefaultAttributes(attributes) || {},
                })
              }
            >
              <BasketSvg className='add-btn__icon' />
            </button>
          </ModalTrigger>
          <div className='product-card__unavailable-info'>Out of stock</div>
        </div>

        <h4 className='product-card__name'>
          {brand} {name}
        </h4>
        <span className='product-card__prize'>
          {symbol}
          {amount.toFixed(2)}
        </span>
        <div className='product-card__veil' />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currency: state.user.currency,
})

export default connect(mapStateToProps, { addItemToCart })(ProductCard)
