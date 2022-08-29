import React from 'react'
import PropTypes from 'prop-types'
import { classNames as c } from '@Utils'
import { connect } from 'react-redux'
import { addItemToCart } from '@/app/userSlice'
import { getDefaultAttributes } from '@Utils'
import Layout from '@Components/Layout'
import Query from '@Components/Query'
import ProductHeader from '@Components/ProductHeader'
import ProductAttributes from '@Components/ProductAttributes'
import ProductPrice from '@Components/ProductPrice'
import ModalTrigger from '@Components/Modal/ModalTrigger'
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

    const defaultAttrs = getDefaultAttributes(attributes)
    if (!defaultAttrs) return

    this.setState(() => ({
      attributesSelection: defaultAttrs,
    }))
  }

  selectAttribute(attrId, attrValue) {
    this.setState((prev) => ({
      attributesSelection: {
        ...prev.attributesSelection,
        [attrId]: attrValue,
      },
    }))
  }

  chooseImage(imageIndex) {
    this.setState(() => ({
      currentImageIndex: imageIndex,
    }))
  }

  render() {
    const { category, apolloClient, productId, addItemToCart } = this.props

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
              <div className={c('product', !inStock && '--unavailable')}>
                <div
                  role='alert'
                  aria-hidden={!inStock}
                  className={c('product__veil')}
                >
                  Out of stock
                </div>
                {gallery.length > 1 && (
                  <section className={c('product', '_|gallery')} aria-hidden>
                    {gallery.map((uri, index) => (
                      <img
                        key={uri}
                        src={uri}
                        alt='product'
                        className={c('gallery__image')}
                        onClick={() => this.chooseImage(index)}
                      />
                    ))}
                  </section>
                )}

                <section className={c('product', '_|presentation')}>
                  <div className={c('presentation__image-container')}>
                    <img
                      src={gallery[this.state.currentImageIndex]}
                      alt='product'
                      className={c('presentation__image')}
                    />
                  </div>
                  <div className={c('presentation', '_|details')}>
                    <ProductHeader
                      brand={brand}
                      name={name}
                      className={c('details__header')}
                    />
                    <ProductAttributes
                      className={c('details__attributes')}
                      selection={this.state.attributesSelection}
                      onSelected={this.selectAttribute.bind(this)}
                      attributes={attributes}
                    />
                    <div className={c('details', '_|price')}>
                      <h5 className={c('price__heading')}>Price:</h5>
                      <ProductPrice
                        className={c('price__value')}
                        prices={prices}
                      />
                    </div>
                    <ModalTrigger
                      name='minicart'
                      type='modal'
                      events={['click', 'keyDown']}
                    >
                      <button
                        className={c('details__action-btn')}
                        onClick={() =>
                          addItemToCart({
                            id: productId,
                            attributes: this.state.attributesSelection,
                            prices,
                          })
                        }
                      >
                        Add to cart
                      </button>
                    </ModalTrigger>
                    <article
                      className='details__description'
                      aria-label='product description'
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

ProductPage.propTypes = {
  apolloClient: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired,
  addItemToCart: PropTypes.func.isRequired,
}

const mapStateToProps = () => ({})

export default connect(mapStateToProps, { addItemToCart })(ProductPage)
