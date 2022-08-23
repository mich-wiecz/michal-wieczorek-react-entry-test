import React from 'react'
import Query from '@Components/Query'
import Loader from '@Components/Loader'
import ErrorAlert from '@Components/ErrorAlert'
import { getCategoriesQuery } from '@Queries'
import { capitalize } from '@Utils'
import { NavLink } from 'react-router-dom'
import './Nav.scss'

class Nav extends React.Component {
  render() {
    const { apolloClient, category } = this.props
    return (
      <Query apolloClient={apolloClient} query={getCategoriesQuery}>
        {({ loading, errors, data }) => (
          <nav className={`${this.props.className} nav`}>
            {loading && <Loader />}
            {errors.length > 0 && (
              <ErrorAlert>Failed to retrieve categories</ErrorAlert>
            )}
            {data && (
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
            )}
          </nav>
        )}
      </Query>
    )
  }
}

export default Nav
