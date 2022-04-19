import { useReducer } from 'react'
import { codesReducer } from './codesReducer'
import { sessionReducer } from './sessionReducer'
import { ICodes, ISession, IState, TypeDispatch } from '../interface'

const initialCodesState: ICodes = {
  data: null,
  state: 'idle',
}

const initialSessionState: ISession = {
  name: null,
  state: 'idle',
}

export const useMyReducer = (): {
  state: IState,
  dispatch: TypeDispatch,
} => {
  const [codes, codesDispatch] = useReducer(codesReducer, initialCodesState)
  const [session, sessionDispatch] = useReducer(sessionReducer, initialSessionState)

  const state: IState = {
    codes,
    session,
  }

  const dispatch: TypeDispatch = {
    codes: codesDispatch,
    session: sessionDispatch,
  }

  return {
    state,
    dispatch,
  }
}
