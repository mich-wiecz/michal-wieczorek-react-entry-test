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
      version,
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
      <div className={`cart-item cart-item--${version} ${className}`}>
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
                    version={version}
                    brand={brand}
                    name={name}
                    onClick={() => history.push(`/${category}/${productId}`)}
                  />
                  <ProductPrice
                    className='cart-item__price'
                    prices={prices}
                    currency={currency}
                    version={version}
                  />
                  <ProductAttributes
                    className='cart-item__attributes'
                    version={version}
                    attributes={attributes}
                    selection={selectedAttributes}
                    onSelected={(attributeId, itemId) =>
                      updateCartItemAttribute({
                        productIndex,
                        attributeId,
                        itemId,
                      })
                    }
                  />
                </div>
                <AmountChanger
                  className='cart-item__amount'
                  version={version}
                  amount={amount}
                  onIncrease={() => increaseCartItemAmount(productIndex)}
                  onDecrease={() => decreaseCartItemAmount(productIndex)}
                />
                <div className='cart-item__img-container'>
                  <img
                    src={gallery[0]}
                    alt='Product'
                    className='cart-item__img'
                  />
                </div>
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
