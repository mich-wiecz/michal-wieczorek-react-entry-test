import React from 'react'
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

export default HeaderActions
