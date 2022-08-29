import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '@Utils'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
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

    const areEveryAttributeValid = product.attributes.every(
      ({ id, name, items }) => {
        if (!(id in selectedAttributes)) return false
        if (name === 'Size') return true
        return items.some(({ value }) => value === selectedAttributes[id])
      }
    )

    if (areEveryAttributeValid) return

    function isSelectedAttributeValid(attrId, attrItems, selectedAttributes) {
      if (!(attrId in selectedAttributes)) return false

      const selectedValue = selectedAttributes[attrId]
      const isSelectedInAttrs = attrItems.some(
        ({ value }) => value === selectedValue
      )

      return isSelectedInAttrs
    }

    const defaultAttrs = getDefaultAttributes(product.attributes)
    const updatedSelectedAttrs = Object.entries(defaultAttrs).reduce(
      (result, [attrId, attrValue], index) => {
        return {
          ...result,
          [attrId]: isSelectedAttributeValid(
            attrId,
            product.attributes[index].items,
            selectedAttributes
          )
            ? selectedAttributes[attrId]
            : attrValue,
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
      className,
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
    } = this.props

    const c = (...classes) => classNames('cart-item', ...classes)

    return (
      <div className={c(variant && '--' + variant, className)}>
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

            const productLink = `/${category}/${productId}`

            return (
              <>
                <div className={c('__details', variant && '--' + variant)}>
                  <Link to={productLink} aria-labelledby={productLink}>
                    <ProductHeader
                      id={productLink}
                      className={c('__header')}
                      variant={variant}
                      brand={brand}
                      name={name}
                    />
                  </Link>
                  <ProductPrice
                    className={c('__price')}
                    prices={prices}
                    currency={currency}
                    variant={variant}
                  />
                  <ProductAttributes
                    className={c('__attributes')}
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
                  className={c('__amount', variant && '--' + variant)}
                  arial-label='Change the quantity of the product'
                  variant={variant}
                  amount={amount}
                  onIncrease={() => increaseCartItemAmount(productIndex)}
                  onDecrease={() => decreaseCartItemAmount(productIndex)}
                />
                <Carousel
                  className={c('__carousel', variant && '--' + variant)}
                  aria-label='Product gallery'
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

CartItem.propTypes = {
  variant: PropTypes.string,
  apolloClient: PropTypes.object.isRequired,
  productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  productIndex: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  selectedAttributes: PropTypes.object.isRequired,
  savedPrices: PropTypes.arrayOf(PropTypes.object).isRequired,
  currency: PropTypes.string.isRequired,
  increaseCartItemAmount: PropTypes.func.isRequired,
  decreaseCartItemAmount: PropTypes.func.isRequired,
  updateCartItemAttribute: PropTypes.func.isRequired,
  replaceCartAttributes: PropTypes.func.isRequired,
  updateCartItemPrices: PropTypes.func.isRequired,
  removeCartItem: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(CartItem)
