import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  name: null,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.name = action.payload.name
    },
    hideModal: (state) => {
      state.name = null
    },
    toggleModal: (state, action) => {
      state.name = state.name ? null : action.payload.name
    },
  },
})

export const {
  showModal: baseShowModal,
  hideModal,
  toggleModal,
} = modalSlice.actions
export function showModal({ name, event }) {
  event.stopPropagation()
  return baseShowModal({ name })
}
export default modalSlice.reducer
