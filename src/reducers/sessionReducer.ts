import {
  ISession,
  IAction,
} from '../interface'

export const sessionReducer = (state: ISession, action: IAction<string | false>): ISession => {
  switch (action.type) {
    case 'login':
      if (action.payload === false) return { name: null, state: 'error' }
      return {
        name: action.payload,
        state: 'login',
      }

    case 'signOut':
      return {
        name: null,
        state: 'idle',
      }

    default:
      return state
  }
}
