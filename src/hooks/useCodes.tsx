import { useEffect } from 'react'
import { fetchCodes } from '../actions/codesActions'
import { ICode } from '../interface'
import { useMyReducer } from '../reducers'

export const useCodes = (): {
  isFetching: boolean,
  hasError: boolean,
  codes: ICode[],
} => {
  const { state, dispatch } = useMyReducer()
  const { codes } = state
  const codesDispatch = dispatch.codes

  useEffect(() => {
    fetchCodes(codesDispatch)
  }, [])

  return ({
    isFetching: codes.state === 'fetching',
    hasError: codes.state === 'error',
    codes: codes.data,
  })
}
