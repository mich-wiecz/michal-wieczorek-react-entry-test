import React from 'react'
import './ProductHeader.scss'

class ProductHeader extends React.Component {
  render() {
    const { className = '', brand, name } = this.props
    return (
      <h2 className={`${className} product-header`}>
        <span className='product-header__brand'>{brand}</span>
        <span className='product-header__name'>{name}</span>
      </h2>
    )
  }
}

export default ProductHeader
