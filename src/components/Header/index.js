import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '@Utils'
import Nav from '@Components/Nav'
import HeaderActions from '@Components/HeaderActions'
import Image from 'react-optimized-image'
import LogoSvg from '@Images/logo.svg'
import './Header.scss'

class Header extends React.Component {
  render() {
    const { className, apolloClient, category, ...props } = this.props

    const c = (...classes) => classNames('header', ...classes)

    return (
      <header id='site-header' className={c(className)} {...props}>
        <div className={c('__content')}>
          <Nav
            className={c('__nav')}
            apolloClient={apolloClient}
            category={category}
          />
          <Image src={LogoSvg} alt='Logo' className={c('__logo')} />
          <HeaderActions
            className={c('__actions')}
            apolloClient={apolloClient}
          />
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  apolloClient: PropTypes.object.isRequired,
  category: PropTypes.string,
}

export default Header
