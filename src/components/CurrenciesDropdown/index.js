import React from 'react'
import PropTypes from 'prop-types'
import { classNames as c } from '@Utils'
import { connect } from 'react-redux'
import { changeCurrency } from '@/app/userSlice'
import { hideModal } from '@/app/modalSlice'
import Modal from '@Components/Modal'
import Query from '@Components/Query'
import { getCurrenciesQuery } from '@Queries'

import './CurrenciesDropdown.scss'

class CurrenciesDropdown extends React.Component {
  handleCurrencySelection(symbol) {
    const { changeCurrency, hideModal } = this.props
    changeCurrency(symbol)
    hideModal('currencies')
  }

  render() {
    const {
      className,
      apolloClient,
      currency,
      changeCurrency,
      hideModal,
      ...props
    } = this.props

    return (
      <Modal
        id='currencies-dropdown'
        className={c('currencies', className)}
        aria-labelledby='currencies-switch'
        role='menu'
        name='currencies'
        type='dialog'
        position={{ top: '63px', right: 0 }}
        backdrop={false}
        transition
      >
        <>
          <Query
            apolloClient={apolloClient}
            query={getCurrenciesQuery}
            loaderSize={114}
            errorMessage='Could not fetch available currencies'
          >
            {(data) => (
              <ul className={c('currencies__list')} {...props}>
                {data.currencies.map(({ label, symbol }, i) => (
                  <li key={symbol}>
                    <button
                      role='menuitemradio'
                      aria-checked={currency === symbol}
                      autoFocus={currency === symbol}
                      className={c(
                        'currencies__item',
                        'currency',
                        currency === symbol && '--current'
                      )}
                      onClick={() => this.handleCurrencySelection(symbol)}
                    >
                      <p className={c('currency__content')}>
                        <span className={c('currency__symbol')}>{symbol}</span>
                        <span className={c('currency__divider')}></span>
                        <span className={c('currency__label')}>{label}</span>
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Query>
        </>
      </Modal>
    )
  }
}

CurrenciesDropdown.propTypes = {
  apolloClient: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  changeCurrency: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
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
