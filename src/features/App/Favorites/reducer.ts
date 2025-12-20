import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { T_AppThunk, T_Dispatch } from 'store/types'

export interface I_FavoritesStore {
  ids: number[]
}

const initialState: I_FavoritesStore = {
  ids: [],
}

const favoritesSlice = createSlice({
  name: 'FAVORITES',
  initialState,
  reducers: {
    addToFavorites(state: I_FavoritesStore, action: PayloadAction<number>) {
      const id = action.payload
      if (!state.ids.includes(id)) state.ids.push(id)
    },
    removeFromFavorites(state: I_FavoritesStore, action: PayloadAction<number>) {
      const id = action.payload
      state.ids = state.ids.filter((x) => x !== id)
    },
    resetFavorites(state: I_FavoritesStore) {
      state.ids = []
    },
  },
})

export const {
  addToFavorites: addToFavoritesAction,
  removeFromFavorites: removeFromFavoritesAction,
  resetFavorites: resetFavoritesAction,
} = favoritesSlice.actions

export const addToFavorites =
  (id: number): T_AppThunk =>
  (dispatch: T_Dispatch) => {
    dispatch(addToFavoritesAction(id))
  }

export const removeFromFavorites =
  (id: number): T_AppThunk =>
  (dispatch: T_Dispatch) => {
    dispatch(removeFromFavoritesAction(id))
  }

export const resetFavorites = (): T_AppThunk => (dispatch: T_Dispatch) => {
  dispatch(resetFavoritesAction())
}

export default favoritesSlice.reducer
