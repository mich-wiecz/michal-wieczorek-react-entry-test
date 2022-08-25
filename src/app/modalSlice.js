import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: null,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      const { name } = action.payload
      state.name = name
    },
    hideModal: (state) => {
      state.name = null
    },
  },
})

export const { showModal, hideModal, updatePosition } = modalSlice.actions

export default modalSlice.reducer
