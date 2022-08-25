import React from 'react'
import CaretLeftSvg from '@Images/caret-left.svg'
import CaretRightSvg from '@Images/caret-right.svg'
import Image from 'react-optimized-image'
import './Carousel.scss'

class Carousel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentImageIndex: 0,
    }
  }

  getValidIndex(index) {
    const { gallery } = this.props
    const lastIndex = gallery.length - 1
    if (index < 0) return lastIndex
    if (index > lastIndex) return 0
    return index
  }

  changeImage(index) {
    this.setState(() => ({ currentImageIndex: this.getValidIndex(index) }))
  }

  render() {
    const {
      className = '',
      gallery,
      alt = '',
      orientation = 'horizontal',
      style = {},
      ...props
    } = this.props

    const imgStyles =
      orientation === 'horizontal'
        ? {
            width: '100%',
          }
        : { height: '100%' }

    if (gallery.length === 1) {
      return (
        <div className={`carousel ${className}`} style={style} {...props}>
          <img
            src={gallery[0]}
            alt={alt}
            className='carousel__image'
            style={imgStyles}
          />
        </div>
      )
    }

    return (
      <div
        className={`carousel carousel ${className}`}
        style={style}
        {...props}
      >
        <img
          src={gallery[this.state.currentImageIndex]}
          alt={alt}
          className={`carousel__image`}
          style={imgStyles}
        />

        <div className='carousel__actions'>
          <Image
            role='button'
            src={CaretLeftSvg}
            alt='Get previous image'
            className='carousel__btn'
            onClick={() => this.changeImage(this.state.currentImageIndex - 1)}
          />
          <Image
            role='button'
            src={CaretRightSvg}
            alt='Get next image'
            className='carousel__btn'
            onClick={() => this.changeImage(this.state.currentImageIndex + 1)}
          />
        </div>
      </div>
    )
  }
}

export default Carousel
