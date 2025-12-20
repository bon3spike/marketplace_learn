import { T_RootState } from 'store/types'

export const selectFavorites = (state: T_RootState) => state.favorites
export const selectFavoritesIds = (state: T_RootState) => selectFavorites(state).ids
export const selectFavoritesCount = (state: T_RootState) => selectFavoritesIds(state).length
