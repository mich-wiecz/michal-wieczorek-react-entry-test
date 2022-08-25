import React from 'react'
import { connect } from 'react-redux'
import CurrenciesDropdown from '@Components/CurrenciesDropdown'
import ModalTrigger from '@Components/Modal/ModalTrigger'
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
          <ModalTrigger
            name='currencies'
            events={['click']}
            modalPosition={{
              top: '63px',
              right: 0,
            }}
          >
            <button type='button' className={`actions__btn currency-switch`}>
              <span className='currency-switch__currency'>{currency}</span>
              <Image
                src={ArrowDownSvg}
                alt='Expand the list of currencies'
                className='currency-switch__expander'
              />
            </button>
          </ModalTrigger>
          <button className='actions__btn basket-toggler'>
            <Image
              src={BasketSvg}
              alt='Show basket'
              className='basket-toggler__icon'
            />
          </button>
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
