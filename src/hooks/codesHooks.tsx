import { useEffect, useReducer } from 'react'
import { ICode, IAction} from '../interface'
import { fetchCodes } from '../actions/codesActions'
import { codesReducer } from '../reducer/codesReducer'

export const useCodes = (): { codes: ICode[], dispatch: React.Dispatch<IAction<ICode | ICode[] | boolean>>, isFetching: boolean, setIsFetching: React.Dispatch<React.SetStateAction<boolean>> } => {
  const [state, dispatch] = useReducer(codesReducer, { codes: null, isFetching: false })

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
