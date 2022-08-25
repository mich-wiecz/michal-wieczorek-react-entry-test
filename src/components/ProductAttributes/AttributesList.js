import React from 'react'
import { areSizesEqual } from '@Utils'
import './ProductAttributes.scss'

class AttributesList extends React.Component {
  render() {
    const {
      className = '',
      name,
      type,
      items,
      selected,
      onSelected,
    } = this.props

    return (
      <ul className={`${className} attrs-list`}>
        {items.map(({ id, value, displayValue }) => {
          const isSelected =
            name === 'Size'
              ? areSizesEqual(selected, value)
              : selected === value

          return (
            <li title={displayValue} key={id}>
              <button
                className={`attribute attribute--${type} ${
                  isSelected ? 'selected' : ''
                }`}
                style={type === 'swatch' ? { backgroundColor: value } : {}}
                onClick={() => onSelected(value)}
              >
                {type === 'text' ? value : ''}
              </button>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default AttributesList
