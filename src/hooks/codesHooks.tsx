import { useEffect, useReducer, useState } from 'react'
import { ICode, IAction, IState } from '../interface'
import { fetchCodes } from '../api/codesApi'
import { codesReducer } from '../reducer/codesReducer'

export const useCodes = (): { codes: ICode[], dispatch: React.Dispatch<IAction<ICode | ICode[] | boolean>>, isFetching: boolean, setIsFetching: React.Dispatch<React.SetStateAction<boolean>> } => {
  const [state, dispatch] = useReducer(codesReducer, { codes: [], isFetching: false })

  const setIsFetching = (b: boolean) => dispatch({ type: 'setFetching', payload: b })

  useEffect(() => {
    (async () => {
      setIsFetching(true)
      const data = await fetchCodes()
      dispatch({ type: 'fetchCodes', payload: data })
      setIsFetching(false)
    })()
  }, [])

  return {
    dispatch,
    codes: state.codes,
    isFetching: state.isFetching,
    setIsFetching,
  }
}
