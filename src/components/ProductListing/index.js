import React from 'react'
import { withRouter } from 'react-router'
import Layout from '@Components/Layout'
import './ProductsList.scss'

class ProductsList extends React.Component {
  render() {
    const { category, apolloClient } = this.props
    return (
      <Layout apolloClient={apolloClient} category={category}>
        <div>kdfsdjkghfgjdsgfd</div>
      </Layout>
    )
  }
}

export default withRouter(ProductsList)
