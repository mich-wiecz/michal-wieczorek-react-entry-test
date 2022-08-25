import { createSlice, original } from '@reduxjs/toolkit'
import { areDeepEqual, getPrice } from '@Utils'

const initialState = {
  currency: '$',
  cart: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeCurrency(state, action) {
      state.currency = action.payload
    },
    addItemToCart(state, action) {
      const { id, amount = 1, attributes = {}, prices } = action.payload

      let similarItemIndex = -1

      const sameItem = state.cart.find((item, index) => {
        if (item.id !== id) return false

        similarItemIndex = index

        return areDeepEqual(original(item.attributes), attributes)
      })

      if (sameItem) {
        sameItem.amount++
      } else if (similarItemIndex !== -1) {
        state.cart.splice(similarItemIndex + 1, 0, {
          id,
          amount,
          attributes,
          prices,
        })
      } else {
        state.cart.push({ id, amount, attributes, prices })
      }
    },
    increaseCartItemAmount(state, action) {
      const index = action.payload
      const item = state.cart[index]
      item.amount++
    },
    decreaseCartItemAmount(state, action) {
      const index = action.payload

      state.cart[index].amount === 1
        ? state.cart.splice(index, 1)
        : state.cart[index].amount--
    },
    updateCartItemAttribute(state, action) {
      const { productIndex, attributeId, attributeValue } = action.payload
      state.cart[productIndex].attributes[attributeId] = attributeValue
    },
    replaceCartAttributes(state, action) {
      const { itemIndex, attributes } = action.payload
      state.cart[itemIndex].attributes = attributes
    },
    removeCartItem(state, action) {
      state.cart.splice(action.payload, 1)
    },
    updateCartItemPrices(state, action) {
      const { itemIndex, prices } = action.payload
      state.cart[itemIndex].prices = prices
    },
  },
})

export function selectItemsTotal(state) {
  return state.user.cart.reduce((total, item) => (total += item.amount), 0)
}

export function selectTotalPrice(state) {
  const total = state.user.cart.reduce((total, item) => {
    const { amount } = getPrice(item.prices, state.user.currency)
    return total + item.amount * amount
  }, 0)

  return Number(total.toFixed(2))
}

export const {
  changeCurrency,
  addItemToCart,
  increaseCartItemAmount,
  decreaseCartItemAmount,
  updateCartItemAttribute,
  replaceCartAttributes,
  removeCartItem,
  updateCartItemPrices,
} = userSlice.actions
export default userSlice.reducer
