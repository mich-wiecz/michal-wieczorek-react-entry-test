import React from 'react'
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

    return (
      <Layout className='cart' apolloClient={apolloClient}>
        <h1 className='cart__title'>Cart</h1>
        <CartItemsListing apolloClient={apolloClient} variant='cart' />
        <TwoColsTable
          className='cart__summary'
          data={{
            'Tax 21%': `${currency}${tax.toFixed(2)}`,
            Quantity: amountTotal,
            Total: {
              value: `${currency}${(priceTotal + tax).toFixed(2)}`,
              highlightedTitle: true,
            },
          }}
        />
        {amountTotal && <button className='cart__order-btn'>Order</button>}
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  currency: state.user.currency,
  amountTotal: selectItemsTotal(state),
  priceTotal: selectTotalPrice(state),
})

export default connect(mapStateToProps, {})(CartPage)
