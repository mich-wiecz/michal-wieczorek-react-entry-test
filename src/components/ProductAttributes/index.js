import React from 'react'
import AttributesList from './AttributesList'
import './ProductAttributes.scss'

class ProductAttributes extends React.Component {
  render() {
    const {
      className = '',
      attributes,
      selection,
      onSelected,
      variant,
    } = this.props
    if (attributes.length === 0) {
      return null
    }
    return (
      <div className={`${className} attrs attrs--${variant}`}>
        {attributes.map(({ id, type, name, items }) => (
          <div key={id} className='attrs__section attrs-section'>
            <h5 className='attrs-section__name'>{name}:</h5>
            <AttributesList
              variant={variant}
              name={name}
              type={type}
              items={items}
              selected={selection[id]}
              onSelected={(value) => onSelected(id, value)}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default ProductAttributes
