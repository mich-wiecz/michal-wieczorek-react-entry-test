import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import CategoryPage from '@Components/CategoryPage'
import ProductPage from '@Components/ProductPage'
import CartPage from '@Components/CartPage'

class App extends React.Component {
  getParams(location) {
    const [, category, productId] = location.pathname.split('/')
    return {
      category: category === '' ? 'all' : category,
      productId,
    }
  }

  render() {
    const { apolloClient, location, history } = this.props
    const { category, productId } = this.getParams(location)
    return (
      <Switch>
        <Route path='/cart'>
          <CartPage apolloClient={apolloClient} />
        </Route>
        <Route path='/:category/:productId'>
          <ProductPage
            apolloClient={apolloClient}
            category={category}
            productId={productId}
          />
        </Route>
        <Route path='/'>
          <CategoryPage
            apolloClient={apolloClient}
            category={category}
            history={history}
          />
        </Route>
      </Switch>
    )
  }
}
export default withRouter(App)
