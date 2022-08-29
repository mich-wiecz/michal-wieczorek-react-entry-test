import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '@Utils'
import './TwoColsTable.scss'

class TwoColsTable extends React.Component {
  render() {
    const { className, data } = this.props

    const { titles, values } = data.reduce(
      (result, [titleOpts, valueOpts]) => {
        result.titles.push(titleOpts)
        result.values.push(valueOpts)
        return result
      },
      { titles: [], values: [] }
    )

    const c = classNames.setParentClass('table')

    return (
      <div role='table' className={c(className)}>
        <ul className={c('__titles')}>
          {titles.map(({ title, highlighted = false, ...props }, index) => {
            return (
              <li
                key={index}
                className={c('__title', highlighted && '--highlighted')}
                {...props}
              >
                {title}:
              </li>
            )
          })}
        </ul>
        <ul className={c('__values')}>
          {values.map(({ value, ...props }, index) => {
            return (
              <li key={index} className={c('__value')} {...props}>
                {value}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

TwoColsTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          title: PropTypes.string,
          highlighted: PropTypes.bool,
        }),
        PropTypes.shape({ value: PropTypes.string }),
      ])
    )
  ),
}

export default TwoColsTable
