import './App.scss'
import React from 'react'
import { Outlet } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        Hello hello hello
        <Outlet />
      </div>
    )
  }
}
export default App
