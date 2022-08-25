import React from 'react'
import { connect } from 'react-redux'
import { selectItemsTotal, selectTotalPrice } from '@/app/userSlice.js'
import Modal from '@Components/Modal'
import CartItemsListing from '@Components/CartItemsListing'
import ProductPrice from '@Components/ProductPrice'
import ActionButton from '@Components/ActionButton'
import './Minicart.scss'

class Minicart extends React.Component {
  render() {
    const { apolloClient, totalAmount, totalPrice, currency } = this.props

    return (
      <Modal
        name='minicart'
        className='minicart'
        transition={true}
        backdrop={true}
        position={{
          top: '80px',
          right: 0,
        }}
      >
        <header className='minicart__header'>
          <h2 className='minicart__title'>My bag, </h2>
          <span className='minicart__total-amount'>{totalAmount} items</span>
        </header>
        <CartItemsListing
          className='minicart__products'
          apolloClient={apolloClient}
          version='mini'
        />
        <div className='minicart__total'>
          <span className='minicart__total-label'>Total</span>
          <ProductPrice
            className='minicart__total-price'
            price={totalPrice}
            currency={currency}
          />
        </div>
        <div className='minicart__actions'>
          <ActionButton className='minicart__btn minicart__btn--light'>
            View bag
          </ActionButton>
          <ActionButton className='minicart__btn'>Check out</ActionButton>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  currency: state.user.currency,
  totalAmount: selectItemsTotal(state),
  totalPrice: selectTotalPrice(state),
})

export default connect(mapStateToProps, {})(Minicart)
