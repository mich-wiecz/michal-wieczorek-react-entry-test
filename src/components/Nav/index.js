import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '@Utils'
import Query from '@Components/Query'
import { getCategoriesQuery } from '@Queries'
import { capitalize } from '@Utils'
import { NavLink } from 'react-router-dom'
import './Nav.scss'

class Nav extends React.Component {
  render() {
    const { className, apolloClient, category } = this.props

    const c = classNames.setParentClass('nav')

    return (
      <Query
        apolloClient={apolloClient}
        query={getCategoriesQuery}
        errorMessage='Failed to retrieve categories'
      >
        {(data) => (
          <nav aria-label='Product categories' className={c(className)}>
            <ul className={c('_|links')}>
              {data.categories.map(({ name }) => {
                const path = name === 'all' ? '/' : `/${name}`
                const isCurrent = category === name
                return (
                  <li key={name}>
                    <NavLink
                      to={path}
                      className={c.raw('links__item', isCurrent && '--active')}
                    >
                      {capitalize(name)}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </nav>
        )}
      </Query>
    )
  }
}

Nav.propTypes = {
  apolloClient: PropTypes.object.isRequired,
  category: PropTypes.string,
}

export default Nav
