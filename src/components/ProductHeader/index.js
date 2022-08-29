import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '@Utils'
import './ProductHeader.scss'

class ProductHeader extends React.Component {
  render() {
    const { className, brand, name, variant, ...props } = this.props

    const c = classNames.setParentClass('product-header')

    return (
      <h2 className={c('--' + variant, className)} {...props}>
        <span className={c('__brand')} aria-label='product brand'>
          {brand}
        </span>
        <span className={c('__name')} aria-label='product name'>
          {name}
        </span>
      </h2>
    )
  }
}

ProductHeader.propTypes = {
  brand: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  variant: PropTypes.string,
}

export default ProductHeader
