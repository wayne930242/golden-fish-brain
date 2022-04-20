import {
  fetchData,
  putData,
  patchData,
  delData,
} from "../api/AwsFunctions"
import Cookies from 'js-cookie'

import { ICode, TypeCodesDispatch, TypeCodesState } from '../interface'

export const fetchCodes = async (dispatch: TypeCodesDispatch) => {
  let data: ICode[] = []
  if (Cookies.get('tableName')) {
    setState(dispatch, 'fetching')
    data = await fetchData(Cookies.get('tableName'))
      .then((newCodes) => {
        localStorage.setItem('codes', JSON.stringify(newCodes))
        return newCodes
      })
      .catch((err) => {
        setState(dispatch, 'error')
        return localStorage.getItem('codes') ? JSON.parse(localStorage.getItem('codes')) as ICode[] : []
      })
      .finally(() => {
        setState(dispatch, 'done')
      })
  } else {
    data = localStorage.getItem('codes') ? JSON.parse(localStorage.getItem('codes')) as ICode[] : []
  }
  dispatch({ type: 'fetchCodes', payload: [...data] })
}

export const clearCodes = (dispatch: TypeCodesDispatch) => {
  dispatch({ type: 'fetchcodes', payload: null })
}

export const putCode = async (dispatch: TypeCodesDispatch, newCode: ICode) => {
  let data: ICode[] = []
  if (Cookies.get('tableName')) {
    setState(dispatch, 'fetching')
    data = await putData(Cookies.get('tableName'), newCode)
      .then((newCodes) => {
        localStorage.setItem('codes', JSON.stringify(newCodes))
        return newCodes
      })
      .catch((err) => {
        setState(dispatch, 'error')
        return localStorage.getItem('codes') ? JSON.parse(localStorage.getItem('codes')) as ICode[] : []
      })
      .finally(() => {
        setState(dispatch, 'done')
      })
  } else {
    const codes: ICode[] = localStorage.getItem('codes')
      ? JSON.parse(localStorage.getItem('codes'))
      : []
    const newCodes = [...codes]
    newCodes.push(newCode)
    localStorage.setItem('codes', JSON.stringify(newCodes))
    fetchCodes(dispatch)
    data = localStorage.getItem('codes') ? JSON.parse(localStorage.getItem('codes')) as ICode[] : []
  }
  dispatch({ type: 'fetchCodes', payload: [...data] })
}

export const patchCode = async (dispatch: TypeCodesDispatch, newCode: ICode) => {
  let data: ICode[] = []
  if (Cookies.get('tableName')) {
    setState(dispatch, 'fetching')
    data = await patchData(Cookies.get('tableName'), newCode)
      .then((newCodes) => {
        localStorage.setItem('codes', JSON.stringify(newCodes))
        return newCodes
      })
      .catch((err) => {
        setState(dispatch, 'error')
        return localStorage.getItem('codes') ? JSON.parse(localStorage.getItem('codes')) as ICode[] : []
      })
      .finally(() => {
        setState(dispatch, 'done')
      })
  } else {
    const codes: ICode[] = localStorage.getItem('codes')
      ? JSON.parse(localStorage.getItem('codes'))
      : []
    const newCodes = codes.map(code => code.id === newCode.id ? newCode : code)
    localStorage.setItem('codes', JSON.stringify(newCodes))
    fetchCodes(dispatch)
    data = localStorage.getItem('codes') ? JSON.parse(localStorage.getItem('codes')) as ICode[] : []
  }
  dispatch({ type: 'fetchCodes', payload: [...data] })
}

export const delCode = async (dispatch: TypeCodesDispatch, oldCode: ICode) => {
  let data: ICode[] = []
  if (Cookies.get('tableName')) {
    setState(dispatch, 'fetching')
    data = await delData(Cookies.get('tableName'), oldCode)
      .then((newCodes) => {
        localStorage.setItem('codes', JSON.stringify(newCodes))
        return newCodes
      })
      .catch((err) => {
        setState(dispatch, 'error')
        return localStorage.getItem('codes') ? JSON.parse(localStorage.getItem('codes')) as ICode[] : []
      })
      .finally(() => {
        setState(dispatch, 'done')
      })
  } else {
    const codes: ICode[] = localStorage.getItem('codes')
      ? JSON.parse(localStorage.getItem('codes'))
      : []
    const newCodes = codes.filter((ele) => ele.id !== oldCode.id)
    localStorage.setItem('codes', JSON.stringify(newCodes))
    fetchCodes(dispatch)
    data = localStorage.getItem('codes') ? JSON.parse(localStorage.getItem('codes')) as ICode[] : []
  }
  dispatch({ type: 'fetchCodes', payload: [...data] })
}

export const setState = (dispatch: TypeCodesDispatch, codesState: TypeCodesState) => {
  dispatch({ type: 'setState', payload: codesState })
}
