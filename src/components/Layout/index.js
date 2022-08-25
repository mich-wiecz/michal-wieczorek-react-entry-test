import React from 'react'
import Header from '@Components/Header'
import Minicart from '@Components/Minicart'
import './Layout.scss'

class Layout extends React.Component {
  render() {
    const { className = '', category, apolloClient } = this.props

    return (
      <div className='layout'>
        <div id='layout' className='layout__content'>
          <Header
            apolloClient={apolloClient}
            category={category}
            className='layout__header'
          />
          <main className={`layout__main ${className}`}>
            {this.props.children}
          </main>
          <Minicart apolloClient={apolloClient} />
        </div>
      </div>
    )
  }
}

export default Layout
