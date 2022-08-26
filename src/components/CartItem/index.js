import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {
  increaseCartItemAmount,
  decreaseCartItemAmount,
  updateCartItemAttribute,
  replaceCartAttributes,
  updateCartItemPrices,
  removeCartItem,
} from '@/app/userSlice'
import Query from '@Components/Query'
import { arePricesArraysEqual, getDefaultAttributes } from '@Utils'
import { getProductQuery } from '@Queries'
import ProductHeader from '@Components/ProductHeader'
import ProductAttributes from '@Components/ProductAttributes'
import ProductPrice from '@Components/ProductPrice'
import AmountChanger from '@Components/AmountChanger'
import Carousel from '@Components/Carousel'
import './CartItem.scss'

class CartItem extends React.Component {
  handleOutOfDateProduct(product) {
    const {
      productIndex,
      selectedAttributes,
      savedPrices,
      replaceCartAttributes,
      removeCartItem,
      updateCartItemPrices,
    } = this.props

    if (!product) {
      return removeCartItem(productIndex)
    }

    if (!arePricesArraysEqual(product.prices, savedPrices)) {
      updateCartItemPrices({ itemIndex: productIndex, prices: product.prices })
    }

    const areEveryAttributePresent = product.attributes.every(
      ({ id }) => id in selectedAttributes
    )

    if (areEveryAttributePresent) return

    const defaultAttrs = getDefaultAttributes(product.attributes)
    const updatedSelectedAttrs = Object.entries(defaultAttrs).reduce(
      (result, [attrId, attrItemId]) => {
        return {
          ...result,
          [attrId]:
            attrId in selectedAttributes
              ? selectedAttributes[attrId]
              : attrItemId,
        }
      },
      {}
    )
    replaceCartAttributes({
      itemIndex: productIndex,
      attributes: updatedSelectedAttrs,
    })
  }

  render() {
    const {
      className = '',
      apolloClient,
      variant,
      productId,
      productIndex,
      amount,
      selectedAttributes,
      currency,
      increaseCartItemAmount,
      decreaseCartItemAmount,
      updateCartItemAttribute,
      history,
    } = this.props

    return (
      <div className={`cart-item cart-item--${variant} ${className}`}>
        <Query
          apolloClient={apolloClient}
          query={getProductQuery}
          variables={{ id: productId }}
          transformer={(data) => {
            const { product } = data
            this.handleOutOfDateProduct(product)
            return product
          }}
          errorMessage='Fetching product failed'
        >
          {(product) => {
            if (!product) {
              return <p>Product unavailable</p>
            }

            const { category, brand, name, prices, attributes, gallery } =
              product

            return (
              <>
                <div className='cart-item__details'>
                  <ProductHeader
                    className='cart-item__header'
                    variant={variant}
                    brand={brand}
                    name={name}
                    onClick={() => history.push(`/${category}/${productId}`)}
                  />
                  <ProductPrice
                    className='cart-item__price'
                    prices={prices}
                    currency={currency}
                    variant={variant}
                  />
                  <ProductAttributes
                    className='cart-item__attributes'
                    variant={variant}
                    attributes={attributes}
                    selection={selectedAttributes}
                    onSelected={(attributeId, attributeValue) =>
                      updateCartItemAttribute({
                        productIndex,
                        attributeId,
                        attributeValue,
                      })
                    }
                  />
                </div>
                <AmountChanger
                  className='cart-item__amount'
                  variant={variant}
                  amount={amount}
                  onIncrease={() => increaseCartItemAmount(productIndex)}
                  onDecrease={() => decreaseCartItemAmount(productIndex)}
                />
                <Carousel
                  className='cart-item__carousel'
                  gallery={variant === 'mini' ? [gallery[0]] : gallery}
                  alt='Product'
                  orientation='horizontal'
                />
              </>
            )
          }}
        </Query>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currency: state.user.currency,
})
const mapDispatchToProps = {
  increaseCartItemAmount,
  decreaseCartItemAmount,
  updateCartItemAttribute,
  replaceCartAttributes,
  updateCartItemPrices,
  removeCartItem,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CartItem))
