import React from 'react'
import Image from 'react-optimized-image'
import ArrowDownSvg from '@Images/arrow-down.svg'
import BasketSvg from '@Images/basket.svg'
import './HeaderActions.scss'

class HeaderActions extends React.Component {
  render() {
    return (
      <div className={`${this.props.className} actions`}>
        <button type='button' className='actions__btn currency-switch'>
          <span className='currency-switch__currency'>$</span>
          <Image
            src={ArrowDownSvg}
            alt='Expand the list of currencies'
            className='currency-switch__expander'
          />
        </button>
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
