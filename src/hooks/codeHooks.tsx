import { useEffect, useReducer, useState } from 'react'
import { ICode, IAction } from '../interface'
import { putCode, fetchCodes } from '../api/codesApi'
import { codesReducer } from '../reducer/codesReducer'

export const usePutCode = (code: ICode): { codes: ICode[], dispatch: React.Dispatch<IAction<ICode | ICode[]>>, isFetching: boolean } => {
  const [codes, dispatch] = useReducer(codesReducer, [])
  const [isFetching, setIsFetching] = useState<boolean>(false)

  useEffect(() => {
    if (code.id === null) return
    (async () => {
      setIsFetching(true)
      putCode(code)
        .then(async () => {
          const data = await fetchCodes()
          dispatch({ type: 'putCode', payload: data })
        })
      setIsFetching(false)
    })()
  }, [code])

  return {
    codes,
    dispatch,
    isFetching,
  }
}
