import './App.scss'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@Components/Header'

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <Header
          apolloClient={this.props.apolloClient}
          className='app__header'
        />
        <main className='app__main'>
          <Outlet />
        </main>
      </div>
    )
  }
}
export default App
