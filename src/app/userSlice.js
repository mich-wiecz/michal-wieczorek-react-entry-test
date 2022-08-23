import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  currency: '$',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeCurrency: (state, action) => {
      state.currency = action.payload
    },
  },
})

export const { changeCurrency } = userSlice.actions
export default userSlice.reducer
