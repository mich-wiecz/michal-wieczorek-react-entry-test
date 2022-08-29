import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '@Utils'
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
      className,
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

    const c = (...classes) => classNames('carousel', ...classes)

    return (
      <div role='listbox' className={c(className)} style={style} {...props}>
        <img
          role='option'
          aria-selected
          src={gallery[this.state.currentImageIndex]}
          alt={alt}
          className={c('__image')}
          style={imgStyles}
        />
        {gallery.length > 1 && (
          <div className={c('__actions')}>
            <button
              aria-label='previous'
              className={c('__btn')}
              onClick={() => this.changeImage(this.state.currentImageIndex - 1)}
            >
              <Image src={CaretLeftSvg} alt='caret left' />
            </button>
            <button
              aria-label='next'
              className={c('__btn')}
              onClick={() => this.changeImage(this.state.currentImageIndex + 1)}
            >
              <Image src={CaretRightSvg} alt='caret right' />
            </button>
          </div>
        )}
      </div>
    )
  }
}

Carousel.propTypes = {
  gallery: PropTypes.array.isRequired,
  alt: PropTypes.string.isRequired,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
}

export default Carousel
