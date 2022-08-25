import { gql } from '@apollo/client'

export const getCategoriesQuery = gql`
  query getCategories {
    categories {
      name
    }
  }
`

export const getCategoryProductsQuery = gql`
  query getCategoryProducts($category: String!) {
    category(input: { title: $category }) {
      products {
        id
        name
        category
        inStock
        prices {
          currency {
            symbol
            label
          }
          amount
        }
        gallery
        attributes {
          id
          name
          type
          items {
            id
            displayValue
            value
          }
        }
      }
    }
  }
`

export const getCurrenciesQuery = gql`
  query getCurrencies {
    currencies {
      label
      symbol
    }
  }
`

export const getProductQuery = gql`
  query getProduct($id: String!) {
    product(id: $id) {
      category
      name
      brand
      inStock
      description
      prices {
        currency {
          symbol
        }
        amount
      }
      gallery
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
    }
  }
`
