import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useMyReducer } from '../reducers'
import { ISession } from '../interface'

export const useSession = (): ISession => {
  const { dispatch, state } = useMyReducer()
  const { session } = state

  useEffect(() => {
    if (Cookies.get('tableName')) {
      dispatch.session({ type: 'login', payload: Cookies.get('tableName') })
    }

  }, [])

  return session
}
