import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '@Utils'
import { connect } from 'react-redux'
import { selectItemsTotal, selectTotalPrice } from '../../app/userSlice'
import Layout from '@Components/Layout'
import CartItemsListing from '@Components/CartItemsListing'
import TwoColsTable from '@Components/TwoColsTable'
import './CartPage.scss'

class CartPage extends React.Component {
  render() {
    const { apolloClient, amountTotal, priceTotal, currency } = this.props

    const tax = Number((priceTotal * 0.21).toFixed(2))

    const c = (...classes) => classNames('cart', ...classes)

    return (
      <Layout className={c()} apolloClient={apolloClient}>
        <h1 className={c('__title')}>Cart</h1>
        <CartItemsListing apolloClient={apolloClient} variant='cart' />
        <TwoColsTable
          className={c('__summary')}
          aria-label='order summary'
          data={[
            [{ title: 'Tax 21%' }, { value: `${currency}${tax.toFixed(2)}` }],
            [{ title: 'Quantity' }, { value: amountTotal }],
            [
              { title: 'Total', highlighted: true },
              { value: `${currency}${priceTotal.toFixed(2)}` },
            ],
          ]}
        />
        {amountTotal > 0 && <button className={c('__order-btn')}>Order</button>}
      </Layout>
    )
  }
}

CartPage.propTypes = {
  apolloClient: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  amountTotal: PropTypes.number.isRequired,
  priceTotal: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => ({
  currency: state.user.currency,
  amountTotal: selectItemsTotal(state),
  priceTotal: selectTotalPrice(state),
})

export default connect(mapStateToProps, {})(CartPage)
