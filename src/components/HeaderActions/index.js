import React from 'react'
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
    const { className = '', currency, apolloClient } = this.props
    return (
      <>
        <div className={`${className} actions`}>
          <ModalTrigger name='currencies' events={['click']}>
            <button type='button' className={`actions__btn currency-switch`}>
              <span className='currency-switch__currency'>{currency}</span>
              <Image
                src={ArrowDownSvg}
                alt='Expand the list of currencies'
                className='currency-switch__expander'
              />
            </button>
          </ModalTrigger>
          <Link to='/cart' className='actions__btn cart-toggler'>
            <Image
              src={BasketSvg}
              alt='Show cart'
              className='cart-toggler__icon'
            />
            <TotalProductsDisplayer className='cart-toggler__total' />
          </Link>
        </div>
        <CurrenciesDropdown apolloClient={apolloClient} />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  currency: state.user.currency,
})
export default connect(mapStateToProps, {}, null)(HeaderActions)
