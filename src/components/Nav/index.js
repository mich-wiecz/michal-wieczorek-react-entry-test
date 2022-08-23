import React from 'react'
import Query from '@Components/Query'
import { getCategoriesQuery } from '@Queries'
import { capitalize } from '@Utils'
import { NavLink } from 'react-router-dom'
import './Nav.scss'

class Nav extends React.Component {
  render() {
    return (
      <Query apolloClient={this.props.apolloClient} query={getCategoriesQuery}>
        {({ loading, errors, data }) => (
          <nav className={`${this.props.className} nav`}>
            {loading && <p>Loading categories..</p>}
            {errors.length > 0 && <p>Categories failed to retrieve</p>}
            {data && (
              <ul class='nav__links links'>
                {data.categories.map(({ name }) => (
                  <li key='name'>
                    <NavLink
                      to={name === 'all' ? '/' : `/${name}`}
                      className={({ isActive }) =>
                        `links__item ${isActive ? 'links__item--active' : ''}`
                      }
                    >
                      {capitalize(name)}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </nav>
        )}
      </Query>
    )
  }
}

export default Nav
