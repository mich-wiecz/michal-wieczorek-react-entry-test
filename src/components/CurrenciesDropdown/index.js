import React from 'react'
import PropTypes from 'prop-types'
import { classNames as c } from '@Utils'
import { connect } from 'react-redux'
import { changeCurrency } from '@/app/userSlice'
import { hideModal } from '@/app/modalSlice'
import Modal from '@Components/Modal'
import Query from '@Components/Query'
import CurrencyItem from './CurrencyItem'
import { getCurrenciesQuery } from '@Queries'

import './CurrenciesDropdown.scss'

class CurrenciesDropdown extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      lastItemIndex: 0,
      focusedItemIndex: -1,
    }
  }

  handleCurrencySelection(symbol) {
    const { changeCurrency, hideModal } = this.props
    changeCurrency(symbol)
    hideModal('currencies')
  }

  handleKeyDown(e) {
    if (!this.state.lastItemIndex) {
      return
    }
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault()
        this.setState((state) => ({
          focusedItemIndex:
            state.focusedItemIndex === state.lastItemIndex
              ? 0
              : state.focusedItemIndex + 1,
        }))
        break
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault()
        this.setState((state) => ({
          focusedItemIndex:
            state.focusedItemIndex === 0
              ? state.lastItemIndex
              : state.focusedItemIndex - 1,
        }))
        break
      default:
        return
    }
  }

  // componentDidMount() {
  //   document.addEventListener('keydown', this.handleKeyDown.bind(this))
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('keydown', this.handleKeyDown.bind(this))
  // }

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
        focusTrap={false}
        onKeyDown={this.handleKeyDown.bind(this)}
      >
        <>
          <Query
            apolloClient={apolloClient}
            query={getCurrenciesQuery}
            loaderSize={114}
            errorMessage='Could not fetch available currencies'
            onLoaded={(data) => {
              const currentIndex = data.currencies.findIndex(
                ({ symbol }) => symbol === currency
              )
              this.setState(() => ({
                lastItemIndex: data.currencies.length - 1,
                focusedItemIndex: currentIndex,
              }))
            }}
          >
            {(data) => (
              <ul className={c('currencies__list')} {...props}>
                {data.currencies.map(({ label, symbol }, i) => (
                  <li key={symbol}>
                    <CurrencyItem
                      className={c('currencies__item')}
                      current={currency}
                      label={label}
                      symbol={symbol}
                      focused={this.state.focusedItemIndex === i}
                      onCurrencyChange={(symbol) =>
                        this.handleCurrencySelection(symbol)
                      }
                    />
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
