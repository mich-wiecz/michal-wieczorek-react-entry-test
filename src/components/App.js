import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import ProductListing from '@Components/ProductListing'

class App extends React.Component {
  getCategory(location) {
    const category = location.pathname.replace('/', '')
    if (category === '') {
      return 'all'
    }
    return category
  }

  render() {
    const { apolloClient } = this.props
    return (
      <Switch>
        <Route
          path='/'
          render={({ location }) => (
            <ProductListing
              apolloClient={apolloClient}
              category={this.getCategory(location)}
            />
          )}
        />
      </Switch>
    )
  }
}
export default withRouter(App)
