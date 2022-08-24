import React from 'react'
import Layout from '@Components/Layout'
import Query from '@Components/Query'
import ErrorAlert from '@Components/ErrorAlert'
import Loader from '@Components/Loader'
import ProductCard from '../ProductCard'
import { getCategoryProductsQuery } from '@Queries'
import { capitalize } from '@Utils'
import './ProductListing.scss'

class ProductsList extends React.Component {
  render() {
    const { category, apolloClient } = this.props

    return (
      <Layout
        className='category'
        apolloClient={apolloClient}
        category={category}
      >
        <h1 className='category__title title'>{capitalize(category)}</h1>
        <div className='category__products products'>
          <Query
            apolloClient={apolloClient}
            query={getCategoryProductsQuery}
            variables={{ category }}
          >
            {({ errors, loading, data }) => (
              <>
                {errors.length > 0 && (
                  <ErrorAlert>Failed to fetch products</ErrorAlert>
                )}
                {loading && <Loader />}
                {data &&
                  data.category.products.map((productData) => (
                    <ProductCard key={productData.id} {...productData} />
                  ))}
              </>
            )}
          </Query>
        </div>
      </Layout>
    )
  }
}

export default ProductsList
