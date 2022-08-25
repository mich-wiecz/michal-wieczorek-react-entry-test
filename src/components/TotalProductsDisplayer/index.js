import React from 'react'
import { connect } from 'react-redux'
import { selectItemsTotal } from '@/app/userSlice'
import './TotalProductsDisplayer.scss'

class TotalProductsDisplayer extends React.Component {
  render() {
    const { className, total } = this.props
    return (
      <span className={`${className} total-products`}>
        {total > 99 ? '99+' : total}
      </span>
    )
  }
}

const mapStateToProps = (state) => ({
  total: selectItemsTotal(state),
})

export default connect(mapStateToProps, {})(TotalProductsDisplayer)
