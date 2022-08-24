import React from 'react'
import { connect } from 'react-redux'
import Layout from '@Components/Layout'
import Query from '@Components/Query'
import ProductHeader from '@Components/ProductHeader'
import ProductAttributes from '@Components/ProductAttributes'
import ProductPrice from '@Components/ProductPrice'
import ActionButton from '@Components/ActionButton'
import { getProductQuery } from '@Queries'
import './ProductPage.scss'

class ProductPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentImageIndex: 0,
      attributesSelection: {},
    }
  }

  initializeAttributesState(data) {
    const { attributes } = data.product
    if (!attributes) {
      return
    }
    const initialAttributesSelection = attributes.reduce(
      (result, { id, items }) => {
        return {
          ...result,
          [id]: items[0].id,
        }
      },
      {}
    )

    this.setState(() => ({
      attributesSelection: initialAttributesSelection,
    }))
  }

  selectAttribute(attrId, itemId) {
    this.setState((prev) => ({
      attributesSelection: {
        ...prev.attributesSelection,
        [attrId]: itemId,
      },
    }))
  }

  chooseImage(imageIndex) {
    this.setState(() => ({
      currentImageIndex: imageIndex,
    }))
  }

  render() {
    const { category, apolloClient, productId } = this.props

    return (
      <Layout apolloClient={apolloClient} category={category}>
        <Query
          apolloClient={apolloClient}
          query={getProductQuery}
          variables={{ id: productId }}
          onLoaded={(data) => this.initializeAttributesState(data)}
          errorMessage='Error trying to fetch product'
          loaderSize={150}
          loaderClassName='product-loader'
        >
          {(data) => {
            const {
              brand,
              name,
              gallery,
              prices,
              description,
              attributes,
              inStock,
            } = data.product
            return (
              <div
                className={`product ${!inStock ? 'product--unavailable' : ''}`}
              >
                <div className='product__veil'>Out of stock</div>
                {gallery.length > 1 && (
                  <section className='product__gallery gallery'>
                    {gallery.map((uri, index) => (
                      <img
                        key={uri}
                        src={uri}
                        alt='product'
                        className='gallery__image'
                        onClick={() => this.chooseImage(index)}
                      />
                    ))}
                  </section>
                )}

                <section className='product__presentation presentation'>
                  <div className='presentation__image-container'>
                    <img
                      src={gallery[this.state.currentImageIndex]}
                      alt='product'
                      className='presentation__image'
                    />
                  </div>
                  <div className='presentation__details details'>
                    <ProductHeader
                      brand={brand}
                      name={name}
                      className='details__header'
                    />
                    <ProductAttributes
                      className='details__attributes'
                      selection={this.state.attributesSelection}
                      onSelected={this.selectAttribute.bind(this)}
                      attributes={attributes}
                    />
                    <div className='details__price price'>
                      <h5 className='price__heading'>Price:</h5>
                      <ProductPrice className='price__value' prices={prices} />
                    </div>
                    <ActionButton className='details__action-btn'>
                      Add to cart
                    </ActionButton>
                    <p
                      className='details__description'
                      dangerouslySetInnerHTML={{
                        __html: description,
                      }}
                    />
                  </div>
                </section>
              </div>
            )
          }}
        </Query>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  currency: state.user.currency,
})

export default connect(mapStateToProps)(ProductPage)
