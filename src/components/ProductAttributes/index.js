import React from 'react'
import AttributesList from './AttributesList'
import './ProductAttributes.scss'

class ProductAttributes extends React.Component {
  render() {
    const { className = '', attributes, selection, onSelected } = this.props
    if (attributes.length === 0) {
      return null
    }
    return (
      <div className={`${className} attrs`}>
        {attributes.map(({ id, type, name, items }) => (
          <div key={id} className='attrs__section attrs-section'>
            <h5 className='attrs-section__name'>{name}:</h5>
            <AttributesList
              type={type}
              items={items}
              selected={selection[id]}
              onSelected={(itemId) => onSelected(id, itemId)}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default ProductAttributes
