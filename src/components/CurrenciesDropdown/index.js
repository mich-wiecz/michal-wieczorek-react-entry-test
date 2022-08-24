import React from 'react'
import { connect } from 'react-redux'
import { changeCurrency } from '@/app/userSlice'
import { showModal, hideModal } from '@/app/modalSlice'
import Modal from '@Components/Modal'
import Query from '@Components/Query'
import { getCurrenciesQuery } from '@Queries'
import Image from 'react-optimized-image'
import ArrowDownSvg from '@Images/arrow-down.svg'
import './CurrenciesDropdown.scss'

class CurrenciesDropdown extends React.Component {
  constructor(props) {
    super(props)

    this.currenciesSwitch = React.createRef()
  }

  render() {
    const {
      className,
      apolloClient,
      modal,
      showModal,
      hideModal,
      currency,
      changeCurrency,
    } = this.props

    return (
      <>
        <button
          ref={this.currenciesSwitch}
          type='button'
          className={`${className} currency-switch`}
          onClick={(e) => showModal({ name: 'currencies', event: e })}
        >
          <span className='currency-switch__currency'>{currency}</span>
          <Image
            src={ArrowDownSvg}
            alt='Expand the list of currencies'
            className='currency-switch__expander'
          />
        </button>
        {modal === 'currencies' && (
          <Modal
            className='currencies'
            onClose={() => hideModal()}
            backdrop={false}
            transition={true}
            relativePositions={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            minWidth={50}
            minHeight={300}
            element={this.currenciesSwitch}
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
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  currency: state.user.currency,
  modal: state.modal.name,
})
const mapDispatchToProps = { changeCurrency, showModal, hideModal }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null
)(CurrenciesDropdown)
