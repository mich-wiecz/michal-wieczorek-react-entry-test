import React from 'react'
import './TwoColsTable.scss'

class TwoColsTable extends React.Component {
  render() {
    const { className = '', data } = this.props

    const { titles, values } = Object.entries(data).reduce(
      (result, [key, value]) => {
        result.titles.push(key)
        result.values.push(value)
        return result
      },
      { titles: [], values: [] }
    )

    return (
      <div role='table' className={`table ${className}`}>
        <ul className='table__titles'>
          {titles.map((title, index) => {
            const highlighted =
              typeof data[title] === 'object'
                ? !!data[title].highlightedTitle
                : false
            return (
              <li
                key={index}
                className={`table__title ${
                  highlighted ? 'table__title--highlighted' : ''
                }`}
              >
                {title}:
              </li>
            )
          })}
        </ul>
        <ul className='table__values'>
          {values.map((value, index) => {
            const val = typeof value === 'object' ? value.value : value

            return (
              <li key={index} className='table__value'>
                {val}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default TwoColsTable
