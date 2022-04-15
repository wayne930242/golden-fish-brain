import { useEffect, useReducer, useState } from 'react'
import { ICode, IAction } from '../interface'
import { fetchCodes } from '../api/codesApi'
import { codesReducer } from '../reducer/codesReducer'

export const useCodes = (): { codes: ICode[], dispatch: React.Dispatch<IAction<ICode | ICode[]>>, isFetching: boolean, setIsFetching: React.Dispatch<React.SetStateAction<boolean>> } => {
  const [codes, dispatch] = useReducer(codesReducer, [])
  const [isFetching, setIsFetching] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      const data = await fetchCodes()
      dispatch({ type: 'fetchCodes', payload: data })
    })()
  }, [])

  return {
    codes,
    dispatch,
    isFetching,
    setIsFetching,
  }
}
