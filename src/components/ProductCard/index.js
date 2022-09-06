import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '@Utils'
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
      currency,
      addItemToCart,
      ...props
    } = this.props
    const { symbol, amount } = getPrice(prices, currency)

    const c = classNames.setParentClass('product-card')

    return (
      <div className={c(!inStock && '--unavailable', className)} {...props}>
        <div className={c('__header')}>
          <div
            role='img'
            aria-label='Product'
            className={c('__image')}
            style={{
              backgroundImage: `url(${gallery[0]})`,
            }}
          ></div>
          <ModalTrigger
            name='minicart'
            type='modal'
            events={['click', 'keyDown']}
          >
            <button
              className={c('_|add-btn')}
              tabIndex={inStock ? 0 : -1}
              onClick={() =>
                addItemToCart({
                  id,
                  prices,
                  attributes: getDefaultAttributes(attributes) || {},
                })
              }
              aria-label='Add product with default options to the cart'
            >
              <BasketSvg className={c.raw('add-btn__icon')} aria-hidden />
            </button>
          </ModalTrigger>
          <div
            role='alert'
            aria-hidden={inStock}
            className={c('__unavailable-info')}
          >
            <span>Out of stock</span>
          </div>
        </div>

        <h4 className={c('__name')} aria-label='brand and name of the product'>
          {brand}
          {name}
        </h4>
        <span className={c('__prize')}>
          {symbol}
          {amount.toFixed(2)}
        </span>
        <div className={c('__veil')} />
      </div>
    )
  }
}

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  inStock: PropTypes.bool.isRequired,
  gallery: PropTypes.arrayOf(PropTypes.string).isRequired,
  prices: PropTypes.arrayOf(PropTypes.object).isRequired,
  attributes: PropTypes.arrayOf(PropTypes.object).isRequired,
  currency: PropTypes.string.isRequired,
  addItemToCart: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  currency: state.user.currency,
})

export default connect(mapStateToProps, { addItemToCart })(ProductCard)
