import React from 'react'
import PropTypes from 'prop-types'
import Image from 'react-optimized-image'
import PlusSvg from '@Images/plus-square.svg'
import MinusSvg from '@Images/minus-square.svg'
import { classNames } from '@Utils'
import './AmountChanger.scss'

class AmountChanger extends React.Component {
  render() {
    const { className, variant, amount, onIncrease, onDecrease, ...props } =
      this.props

    const c = (...args) => classNames('amount-changer', ...args)

    return (
      <div
        role='spinbutton'
        aria-valuenow={amount}
        className={c(className)}
        {...props}
      >
        <button
          className={c('__btn', '--' + variant)}
          onClick={onIncrease}
          aria-label='increase'
        >
          <Image src={PlusSvg} alt='plus' />
        </button>

        <span aria-label='amount' className={c('__amount', '--' + variant)}>
          {amount}
        </span>
        <button
          className={c('__btn', '--' + variant)}
          onClick={onDecrease}
          aria-label='decrease'
        >
          <Image src={MinusSvg} alt='minus' />
        </button>
      </div>
    )
  }
}

AmountChanger.propTypes = {
  variant: PropTypes.string,
  amount: PropTypes.number.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
}

export default AmountChanger
