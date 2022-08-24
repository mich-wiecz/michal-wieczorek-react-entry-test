import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  name: null,
  position: null,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      const { name, position } = action.payload
      state.name = name
      state.position = position
    },
    hideModal: (state) => {
      state.name = null
      state.position = null
    },
    updatePosition(state, action) {
      state.position = action.payload
    },
  },
})

export const { showModal, hideModal, updatePosition } = modalSlice.actions

export default modalSlice.reducer
