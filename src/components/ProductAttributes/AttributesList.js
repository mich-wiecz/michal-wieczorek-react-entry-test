import React from 'react'
import './ProductAttributes.scss'

class AttributesList extends React.Component {
  render() {
    const { className = '', type, items, selected, onSelected } = this.props

    return (
      <ul className={`${className} attrs-list`}>
        {items.map(({ id, value, displayValue }) => (
          <li title={displayValue} key={id}>
            <button
              className={`attribute attribute--${type} ${
                selected === id ? 'selected' : ''
              }`}
              style={type === 'swatch' ? { backgroundColor: value } : {}}
              onClick={() => onSelected(id)}
            >
              {type === 'text' ? value : ''}
            </button>
          </li>
        ))}
      </ul>
    )
  }
}

export default AttributesList
