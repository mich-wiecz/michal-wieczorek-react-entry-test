import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '@Utils'
import AttributesList from './AttributesList'
import './ProductAttributes.scss'

class ProductAttributes extends React.Component {
  render() {
    const { className, attributes, selection, onSelected, variant } = this.props
    if (attributes.length === 0) {
      return null
    }

    const c = classNames.setParentClass('attrs')

    return (
      <div className={c(className)}>
        {attributes.map(({ id, type, name, items }) => (
          <fieldset
            role='radiogroup'
            aria-label='Product attributes'
            key={id}
            className={c('__section', '--' + variant)}
          >
            <legend className={c('__name', '--' + variant)}>{name}:</legend>
            <AttributesList
              variant={variant}
              name={name}
              type={type}
              items={items}
              selected={selection[id]}
              onSelected={(value) => onSelected(id, value)}
            />
          </fieldset>
        ))}
      </div>
    )
  }
}

ProductAttributes.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.object).isRequired,
  selection: PropTypes.objectOf(PropTypes.string).isRequired,
  variant: PropTypes.string,
}

export default ProductAttributes
