import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '@Utils'
import Layout from '@Components/Layout'
import Query from '@Components/Query'
import ProductCard from '../ProductCard'
import { getCategoryProductsQuery } from '@Queries'
import { capitalize } from '@Utils'
import './CategoryPage.scss'

class CategoryPage extends React.Component {
  render() {
    const { category, apolloClient, history } = this.props

    const c = (...classes) => classNames('category', ...classes)

    return (
      <Layout className={c()} apolloClient={apolloClient} category={category}>
        <h1 className={c('__title')}>{capitalize(category)}</h1>
        <div className={c('__products')}>
          <Query
            apolloClient={apolloClient}
            query={getCategoryProductsQuery}
            variables={{ category }}
            errorMessage='Failed to fetch products'
            loaderSize={150}
          >
            {(data) =>
              data.category.products.map((productData) => {
                const goToProduct = () =>
                  productData.inStock
                    ? history.push(`/${productData.category}/${productData.id}`)
                    : {}
                return (
                  <ProductCard
                    key={productData.id}
                    role='link'
                    aria-label='Product details'
                    tabIndex={productData.inStock ? 0 : -1}
                    {...productData}
                    onClick={goToProduct}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        goToProduct()
                      }
                    }}
                  />
                )
              })
            }
          </Query>
        </div>
      </Layout>
    )
  }
}

CategoryPage.propTypes = {
  apolloClient: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
}

export default CategoryPage
