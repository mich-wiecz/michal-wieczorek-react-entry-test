import React from 'react'
import Layout from '@Components/Layout'
import Query from '@Components/Query'
import ProductCard from '../ProductCard'
import { getCategoryProductsQuery } from '@Queries'
import { capitalize } from '@Utils'
import './CategoryPage.scss'

class CategoryPage extends React.Component {
  render() {
    const { category, apolloClient, history } = this.props

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
            errorMessage='Failed to fetch products'
            loaderSize={150}
          >
            {(data) =>
              data.category.products.map((productData) => (
                <ProductCard
                  key={productData.id}
                  {...productData}
                  onClick={() =>
                    productData.inStock
                      ? history.push(
                          `/${productData.category}/${productData.id}`
                        )
                      : {}
                  }
                />
              ))
            }
          </Query>
        </div>
      </Layout>
    )
  }
}

export default CategoryPage
