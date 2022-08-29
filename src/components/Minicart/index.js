import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '@Utils'
import { connect } from 'react-redux'
import { selectItemsTotal, selectTotalPrice } from '@/app/userSlice.js'
import { hideModal } from '@/app/modalSlice.js'
import { Link } from 'react-router-dom'
import Modal from '@Components/Modal'
import CartItemsListing from '@Components/CartItemsListing'
import ProductPrice from '@Components/ProductPrice'
import './Minicart.scss'

class Minicart extends React.Component {
  render() {
    const {
      apolloClient,
      container,
      totalAmount,
      totalPrice,
      currency,
      hideModal,
    } = this.props

    const c = classNames.setParentClass('minicart')

    return (
      <Modal
        className={c()}
        name='minicart'
        type='modal'
        aria-labelledby='minicart-header'
        aria-describedby='minicart-desc'
        transition={true}
        backdrop={true}
        element={container}
        position={({ right }) => ({
          top: '80px',
          right: `calc(100vw - ${right + 16}px)`,
        })}
        focusTrap
      >
        <header id='minicart-header' className={c('__header')}>
          <h2 className={c('__title')}>My bag, </h2>
          <span className={c('__total-amount')}>
            {totalAmount} {totalAmount === 1 ? 'item' : 'items'}
          </span>
        </header>
        <p id='minicart-desc' className='sr-only'>
          Mini version of the cart, press escape to close
        </p>
        <CartItemsListing
          className={c('__products')}
          apolloClient={apolloClient}
          variant='mini'
        />
        <div className={c('__total')}>
          <span className={c('__total-label')}>Total</span>
          <ProductPrice
            className={c('__total-price')}
            price={totalPrice}
            currency={currency}
          />
        </div>
        <div className={c('__actions')}>
          <Link
            to='/cart'
            aria-label='Cart page'
            className={c('__btn', '--light')}
            onClick={() => hideModal()}
          >
            View bag
          </Link>
          <button className={c('__btn')}>Check out</button>
        </div>
      </Modal>
    )
  }
}

Minicart.propTypes = {
  apolloClient: PropTypes.object.isRequired,
  container: PropTypes.object,
  totalAmount: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  currency: state.user.currency,
  totalAmount: selectItemsTotal(state),
  totalPrice: selectTotalPrice(state),
})

export default connect(mapStateToProps, { hideModal })(Minicart)
