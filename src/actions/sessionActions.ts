import Cookies from 'js-cookie'

import { setState } from './codesActions'
import { fetchData } from '../api/AwsFunctions'
import { TypeDispatch, ICode } from "../interface"

export const loginAction = async (dispatch: TypeDispatch, name: string): Promise<void> => {
  setState(dispatch.codes, 'fetching')
  return new Promise((resolve, reject) => {
    fetchData(name)
      .then((data: ICode[]) => {
        Cookies.set('tableName', name, {
          sameSite: 'lax',
        })
        dispatch.session({ type: 'login', payload: name })
        dispatch.codes({ type: 'fetchCodes', payload: data })
        setState(dispatch.codes, 'done')
        resolve()
      })
      .catch((err) => {
        setState(dispatch.codes, 'error')
        dispatch.session({ type: 'login', payload: false })
        reject()
      })
  })
}

export const signOutAction = (dispatch: TypeDispatch) => {
  dispatch.session({ type: 'signout' })
  Cookies.remove('tableName')
}
