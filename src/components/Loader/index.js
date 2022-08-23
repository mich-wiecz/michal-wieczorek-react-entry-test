import React from 'react'
import './Loader.scss'

class Loader extends React.Component {
  render() {
    const { size = 80 } = this.props

    const style = {
      width: `${size}px`,
      height: `${size}px`,
    }

    return (
      <div style={style} className='loader'>
        <div className='dot'></div>
        <div className='dot'></div>
        <div className='dot'></div>
        <div className='dot'></div>
      </div>
    )
  }
}

export default Loader
