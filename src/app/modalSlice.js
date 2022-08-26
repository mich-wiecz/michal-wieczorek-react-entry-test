import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  current: [],
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal(state, action) {
      const { name, isDisruptive = false } = action.payload
      state.current = isDisruptive ? [name] : [...state.current, name]
    },
    hideModal(state, action) {
      const name = action.payload
      state.current = name
        ? state.current.filter((modal) => modal !== name)
        : []
    },
    hideOtherModals(state, action) {
      const modalName = action.payload
      state.current = state.current.filter((modal) => modal === modalName)
    },
  },
})

export const { showModal, hideModal, hideOtherModals } = modalSlice.actions

export default modalSlice.reducer
