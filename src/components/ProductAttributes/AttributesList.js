import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '@Utils'
import { areSizesEqual } from '@Utils'
import { v4 as uuid } from 'uuid'
import './ProductAttributes.scss'

class AttributesList extends React.Component {
  render() {
    const { className, variant, name, type, items, selected, onSelected } =
      this.props

    const c = classNames.setParentClass('attrs-list')

    return (
      <ul className={c(className)}>
        {items.map(({ id, value, displayValue }) => {
          const isSelected =
            name === 'Size'
              ? areSizesEqual(selected, value)
              : selected === value

          const radioId = uuid()

          return (
            <li key={id}>
              <p
                className={c.raw('attribute', '--' + variant)}
                title={displayValue}
              ></p>
              <input
                id={radioId}
                className={c.raw('attribute__radio')}
                type='radio'
                checked={isSelected}
                onChange={() => onSelected(value)}
              />
              <label
                htmlFor={radioId}
                className={c.raw(
                  'attribute__label',
                  '--' + type,
                  '--' + variant,
                  isSelected && 'selected'
                )}
                style={type === 'swatch' ? { backgroundColor: value } : {}}
              >
                <span aria-hidden>{type === 'text' ? value : ''}</span>
                <span className='sr-only'>{displayValue}</span>
              </label>
            </li>
          )
        })}
      </ul>
    )
  }
}

AttributesList.propTypes = {
  variant: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'swatch']),
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  selected: PropTypes.string,
  onSelected: PropTypes.func.isRequired,
}

export default AttributesList
