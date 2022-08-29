import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '@Utils'
import { connect } from 'react-redux'
import CartItem from '@Components/CartItem'
import './CartItemsListing.scss'

class CartItemsListing extends React.Component {
  render() {
    const { className, apolloClient, variant, items } = this.props

    const c = (...classes) => classNames('cart-listing', ...classes)

    return (
      <ul className={c(className)}>
        {items.map(({ id, amount, attributes, prices }, index) => (
          <li key={index}>
            <CartItem
              className={c('__item', variant && '--' + variant)}
              apolloClient={apolloClient}
              variant={variant}
              productId={id}
              productIndex={index}
              amount={amount}
              savedPrices={prices}
              selectedAttributes={attributes}
            />
          </li>
        ))}
      </ul>
    )
  }
}

CartItemsListing.propTypes = {
  variant: PropTypes.string,
  apolloClient: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const mapStateToProps = (state) => ({
  items: state.user.cart,
})

export default connect(mapStateToProps, {})(CartItemsListing)
