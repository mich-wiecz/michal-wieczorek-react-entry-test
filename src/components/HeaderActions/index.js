import React from 'react'
import { connect } from 'react-redux'
import { showModal, hideModal } from '@/app/modalSlice'
import Image from 'react-optimized-image'
import BasketSvg from '@Images/basket.svg'
import CurrenciesDropdown from '@Components/CurrenciesDropdown'
import './HeaderActions.scss'

class HeaderActions extends React.Component {
  constructor(props) {
    super(props)
    this.actions = React.createRef()
  }

  render() {
    const modalProps = {
      className: 'actions__btn',
      apolloClient: this.props.apolloClient,
    }

    return (
      <div ref={this.actions} className={`${this.props.className} actions`}>
        <CurrenciesDropdown {...modalProps} />
        <button className='actions__btn basket-toggler'>
          <Image
            src={BasketSvg}
            alt='Show basket'
            className='basket-toggler__icon'
          />
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  modal: state.modal.name,
  currency: state.user.currency,
})
const mapDispatchToProps = { showModal, hideModal }

export default connect(mapStateToProps, mapDispatchToProps)(HeaderActions)
