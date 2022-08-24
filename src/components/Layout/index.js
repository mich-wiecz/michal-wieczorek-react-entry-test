import React from 'react'
import Header from '@Components/Header'
import './Layout.scss'

class Layout extends React.Component {
  render() {
    const { className = '', category, apolloClient } = this.props

    return (
      <div className='layout'>
        <div className='layout__content'>
          <Header
            apolloClient={apolloClient}
            category={category}
            className='layout__header'
          />
          <main className={`layout__main ${className}`}>
            {this.props.children}
          </main>
        </div>
      </div>
    )
  }
}
export default Layout
