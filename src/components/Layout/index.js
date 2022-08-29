import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '@Utils'
import Header from '@Components/Header'
import Minicart from '@Components/Minicart'
import './Layout.scss'

class Layout extends React.Component {
  constructor(props) {
    super(props)

    this.layout = React.createRef()

    this.state = {
      element: null,
    }
  }

  render() {
    const { className, category, apolloClient, children } = this.props

    const c = classNames.setParentClass('layout')

    return (
      <div className={c()}>
        <div
          ref={(e) => !this.state.element && this.setState({ element: e })}
          id='layout'
          className={c('__content')}
        >
          <Header
            apolloClient={apolloClient}
            category={category}
            className={c('__header')}
          />
          <main className={c('__main', className)}>{children}</main>
          <Minicart
            apolloClient={apolloClient}
            container={this.state.element}
          />
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
  category: PropTypes.string,
  apolloClient: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
}

export default Layout
