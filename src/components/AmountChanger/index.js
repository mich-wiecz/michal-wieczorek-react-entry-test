import React from 'react'
import Image from 'react-optimized-image'
import PlusSvg from '@Images/plus-square.svg'
import MinusSvg from '@Images/minus-square.svg'
import './AmountChanger.scss'

class AmountChanger extends React.Component {
  render() {
    const {
      className = '',
      variant,
      amount,
      onIncrease,
      onDecrease,
    } = this.props
    return (
      <div className={`amount-changer amount-changer--${variant} ${className}`}>
        <Image
          role='button'
          src={PlusSvg}
          alt='Increase'
          className='amount-changer__btn'
          onClick={onIncrease}
        />
        <span className='amount-changer__amount'>{amount}</span>
        <Image
          role='button'
          src={MinusSvg}
          alt='Increase'
          className='amount-changer__btn'
          onClick={onDecrease}
        />
      </div>
    )
  }
}

export default AmountChanger
