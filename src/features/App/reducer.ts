import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { T_AppThunk, T_Dispatch } from 'store/types'
import { I_AppStore } from './types'

const initialState: I_AppStore = {
  isLogged: true,
  isAppLoading: false,
}

const appSlice = createSlice({
  name: 'APP',
  initialState,
  reducers: {
    setIsLogged(state: I_AppStore, action: PayloadAction<boolean>) {
      state.isLogged = action.payload
    },
    setIsAppLoading(state: I_AppStore, action: PayloadAction<boolean>) {
      state.isAppLoading = action.payload
    },
  },
})

export const { setIsLogged: setIsLoggedAction, setIsAppLoading: setIsAppLoadingAction } =
  appSlice.actions

export const setIsLogged =
  (isLogged: boolean): T_AppThunk =>
  (dispatch: T_Dispatch) => {
    dispatch(setIsLoggedAction(isLogged))
  }

export const setIsAppLoading =
  (isAppLoading: boolean): T_AppThunk =>
  (dispatch: T_Dispatch) => {
    dispatch(setIsAppLoadingAction(isAppLoading))
  }

export default appSlice.reducer
