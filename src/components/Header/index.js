import React from 'react'
import Nav from '@Components/Nav'
import HeaderActions from '@Components/HeaderActions'
import Image from 'react-optimized-image'
import LogoSvg from '@Images/logo.svg'
import './Header.scss'

class Header extends React.Component {
  render() {
    const { apolloClient, category } = this.props
    return (
      <header className={`${this.props.className} header`}>
        <div className='header__content'>
          <Nav
            className='header__nav'
            apolloClient={apolloClient}
            category={category}
          />
          <Image src={LogoSvg} alt='Logo' className='header__logo' />
          <HeaderActions
            className='header__actions'
            apolloClient={apolloClient}
          />
        </div>
      </header>
    )
  }
}

export default Header
