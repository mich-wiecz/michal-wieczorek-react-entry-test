import React from 'react'
import Header from '@Components/Header'
import './Layout.scss'

class Layout extends React.Component {
  render() {
    const { category, apolloClient } = this.props

    return (
      <div className='layout'>
        <Header
          apolloClient={apolloClient}
          category={category}
          className='layout__header'
        />
        <main className='layout__main'>{this.props.children}</main>
      </div>
    )
  }
}
export default Layout
