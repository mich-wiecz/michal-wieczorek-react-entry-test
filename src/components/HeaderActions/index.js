import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '@Utils'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import CurrenciesDropdown from '@Components/CurrenciesDropdown'
import ModalTrigger from '@Components/Modal/ModalTrigger'
import TotalProductsDisplayer from '@Components/TotalProductsDisplayer'
import Image from 'react-optimized-image'
import BasketSvg from '@Images/basket.svg'
import ArrowDownSvg from '@Images/arrow-down.svg'
import './HeaderActions.scss'

class HeaderActions extends React.Component {
  render() {
    const { className, currency, apolloClient } = this.props

    const c = classNames.setParentClass('actions')

    return (
      <>
        <div className={c(className)}>
          <ModalTrigger name='currencies' events={['click']}>
            <button
              id='currencies-switch'
              className={c('__btn', 'currency-switch')}
              aria-controls='currencies-dropdown'
              aria-haspopup='true'
            >
              <span className={c.raw('currency-switch__currency')}>
                {currency}
              </span>
              <Image
                src={ArrowDownSvg}
                alt='List of available currencies'
                className={c.raw('currency-switch__expander')}
              />
            </button>
          </ModalTrigger>
          <Link
            to='/cart'
            className={c('__btn', 'cart-toggler')}
            aria-label='cart'
          >
            <Image
              src={BasketSvg}
              alt='Cart'
              className={c.raw('cart-toggler__icon')}
            />
            <TotalProductsDisplayer
              className={c.raw('cart-toggler__total')}
              aria-label='total amount of products in the cart'
            />
          </Link>
        </div>
        <CurrenciesDropdown
          apolloClient={apolloClient}
          id='currencies-dropdown'
        />
      </>
    )
  }
}

HeaderActions.propTypes = {
  apolloClient: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  currency: state.user.currency,
})
export default connect(mapStateToProps, {}, null)(HeaderActions)
