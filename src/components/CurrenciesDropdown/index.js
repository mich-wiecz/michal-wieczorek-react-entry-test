import React from 'react'
import { connect } from 'react-redux'
import { changeCurrency } from '@/app/userSlice'
import { hideModal } from '@/app/modalSlice'
import Modal from '@Components/Modal'
import Query from '@Components/Query'
import { getCurrenciesQuery } from '@Queries'

import './CurrenciesDropdown.scss'

class CurrenciesDropdown extends React.Component {
  render() {
    const {
      className = '',
      apolloClient,
      currency,
      changeCurrency,
    } = this.props

    return (
      <Modal
        className={`currencies ${className}`}
        name='currencies'
        position={{ top: '63px', right: 0 }}
        backdrop={false}
        transition={true}
      >
        <Query
          apolloClient={apolloClient}
          query={getCurrenciesQuery}
          loaderSize={114}
          errorMessage='Could not fetch available currencies'
        >
          {(data) => (
            <ul className='currencies__list list'>
              {data.currencies.map(({ label, symbol }) => (
                <li
                  key={symbol}
                  role='button'
                  className={`list__item item ${
                    currency === symbol ? 'item--current' : ''
                  }`}
                  onClick={() => changeCurrency(symbol)}
                >
                  <div className='item__content'>
                    <span className='item__symbol'>{symbol}</span>
                    <span className='item__divider'></span>
                    <span className='item__label'>{label}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Query>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  currency: state.user.currency,
})
const mapDispatchToProps = { changeCurrency, hideModal }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null
)(CurrenciesDropdown)
