import { T_RootState } from 'store/types'

import { I_UserData } from './types'

const emptyUserData: I_UserData = {
  id: null,
  login: null,
  email: null,
  nameFirst: 'Гость',
  nameLast: '',
  namePatronymic: null,
  displayName: null,
  birthDate: null,
  gender: null,
}

export const selectUserData = (_state: T_RootState) => emptyUserData
