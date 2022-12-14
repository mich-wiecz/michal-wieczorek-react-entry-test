import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import { store } from './app/store'
import { Provider } from 'react-redux'
import App from '@Components/App'
import '@Styles/global.scss'

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <BrowserRouter>
          <App apolloClient={apolloClient} />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
)

reportWebVitals()
