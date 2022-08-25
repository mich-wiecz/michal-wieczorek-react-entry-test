import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import modalReducer from './modalSlice'

const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action)

    if (!action.type.includes('user')) {
      return result
    }

    try {
      localStorage.setItem('userState', JSON.stringify(getState().user))
    } catch (error) {
      console.error(error)
    }

    return result
  }
}

const rehydrateStore = () => {
  const userState = localStorage.getItem('userState')
  if (!userState) return

  return {
    user: JSON.parse(userState),
  }
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
  },
  preloadedState: rehydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
})
