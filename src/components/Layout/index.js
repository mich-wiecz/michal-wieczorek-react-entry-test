import React from 'react'
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
    const { className = '', category, apolloClient } = this.props

    return (
      <div className='layout'>
        <div
          ref={(e) => !this.state.element && this.setState({ element: e })}
          id='layout'
          className='layout__content'
        >
          <Header
            apolloClient={apolloClient}
            category={category}
            className='layout__header'
          />
          <main className={`layout__main ${className}`}>
            {this.props.children}
          </main>
          <Minicart
            apolloClient={apolloClient}
            container={this.state.element}
          />
        </div>
      </div>
    )
  }
}

export default Layout
