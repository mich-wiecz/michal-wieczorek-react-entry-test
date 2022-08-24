import React from 'react'
import Query from '@Components/Query'
import { getCategoriesQuery } from '@Queries'
import { capitalize } from '@Utils'
import { NavLink } from 'react-router-dom'
import './Nav.scss'

class Nav extends React.Component {
  render() {
    const { apolloClient, category } = this.props
    return (
      <Query
        apolloClient={apolloClient}
        query={getCategoriesQuery}
        errorMessage='Failed to retrieve categories'
      >
        {(data) => (
          <nav className={`${this.props.className} nav`}>
            <ul className='nav__links links'>
              {data.categories.map(({ name }) => {
                const path = name === 'all' ? '/' : `/${name}`
                const isCurrent = category === name
                return (
                  <li key={name}>
                    <NavLink
                      to={path}
                      className={`links__item ${
                        isCurrent ? 'links__item--active' : ''
                      }`}
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

export default Nav
