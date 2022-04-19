import {
  fetchData,
  putData,
  patchData,
  delData,
} from "../api/AwsFunctions"
import Cookies from 'js-cookie'

import { ICode, IAction, TypeCodesDispatch, TypeCodesState } from '../interface'

export const fetchCodes = async (dispatch: TypeCodesDispatch) => {
  let data: ICode[] = []
  if (Cookies.get('tableName')) {
    setState(dispatch, 'fetching')
    data = await fetchData(Cookies.get('tableName'))
      .then((newCodes) => {
        localStorage.setItem('tableName', JSON.stringify(newCodes))
        setState(dispatch, 'done')
        return newCodes
      })
      .catch((err) => {
        setState(dispatch, 'error')
        return localStorage.getItem('tableName') ? JSON.parse(localStorage.getItem('tableName')) as ICode[] : []
      })
  } else {
    data = localStorage.getItem('tableName') ? JSON.parse(localStorage.getItem('tableName')) as ICode[] : []
  }
  dispatch({ type: 'fetchCodes', payload: data })
}

export const clearCodes = (dispatch: TypeCodesDispatch) => {
  dispatch({ type: 'fetchcodes', payload: [] })
}

export const putCode = async (dispatch: TypeCodesDispatch, newCode: ICode) => {
  if (Cookies.get('tableName')) {
    putData(Cookies.get('tableName'), newCode)
      .then(async () => {
        fetchCodes(dispatch)
      })
  } else {
    const codes: ICode[] = localStorage.getItem('tableName')
      ? JSON.parse(localStorage.getItem('tableName'))
      : []
    const newCodes = [...codes]
    newCodes.push(newCode)
    localStorage.setItem('tableName', JSON.stringify(newCodes))
    fetchCodes(dispatch)
  }
}

export const patchCode = async (dispatch: TypeCodesDispatch, newCode: ICode) => {
  if (Cookies.get('tableName')) {
    patchData(Cookies.get('tableName'), newCode)
      .then(async () => {
        fetchCodes(dispatch)
      })
  } else {
    const codes: ICode[] = localStorage.getItem('tableName')
      ? JSON.parse(localStorage.getItem('tableName'))
      : []
    const newCodes = codes.map(code => code.id === newCode.id ? newCode : code)
    localStorage.setItem('tableName', JSON.stringify(newCodes))
    fetchCodes(dispatch)
  }
}

export const delCode = async (dispatch: TypeCodesDispatch, oldCode: ICode) => {
  if (Cookies.get('tableName')) {
    delData(Cookies.get('tableName'), oldCode)
      .then(async () => {
        fetchCodes(dispatch)
      })
  } else {
    const codes: ICode[] = localStorage.getItem('tableName')
      ? JSON.parse(localStorage.getItem('tableName'))
      : []
    const newCodes = codes.filter((ele) => ele.id !== oldCode.id)
    localStorage.setItem('tableName', JSON.stringify(newCodes))
    fetchCodes(dispatch)
  }
}

export const setState = (dispatch: TypeCodesDispatch, codesState: TypeCodesState) => {
  dispatch({ type: 'setState', payload: codesState })
}
