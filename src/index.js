import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloConsumer,
} from '@apollo/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import { store } from './app/store'
import { Provider } from 'react-redux'
import App from '@Components/App'
import ProductsList from '@Components/ProductsList'
import './index.scss'

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <ApolloConsumer>
        {(client) => {
          return (
            <Provider store={store}>
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<App apolloClient={client} />}>
                    <Route path=':category' element={<ProductsList />} />
                    <Route path='cart' element={<div />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </Provider>
          )
        }}
      </ApolloConsumer>
    </ApolloProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
