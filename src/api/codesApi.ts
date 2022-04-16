import {
  fetchData,
  putData,
  patchData,
  delData,
} from "./AwsFunctions"
import Cookies from 'js-cookie'

import { ICode } from '../interface'

export const fetchCodes = async (): Promise<ICode[]> => {
  if (!Cookies.get('tableName')) return localStorage.getItem('tableName') ? JSON.parse(localStorage.getItem('tableName')) as ICode[] : []
  const data = await fetchData(Cookies.get('tableName'))
      .then((newCodes) => {
        localStorage.setItem('tableName', JSON.stringify(newCodes))
        return newCodes
      })
      .catch((err) => {
        return localStorage.getItem('tableName') ? JSON.parse(localStorage.getItem('tableName')) as ICode[] : []
      })
  return data
}

export const putCode = async (data: ICode) => {
  if (Cookies.get('tableName')) {
    putData(Cookies.get('tableName'), data)
  }

  const codes: ICode[] = localStorage.getItem('tableName')
    ? JSON.parse(localStorage.getItem('tableName'))
    : []
  const newCodes = [...codes]
  newCodes.push(data)
  localStorage.setItem('tableName', JSON.stringify(newCodes))
}

export const patchCode = async (data: ICode) => {
  if (Cookies.get('tableName')) {
    patchData(Cookies.get('tableName'), data)
  }

  const codes: ICode[] = localStorage.getItem('tableName')
    ? JSON.parse(localStorage.getItem('tableName'))
    : []
  const newCodes = codes.map(code => code.id === data.id ? data : code)
  localStorage.setItem('tableName', JSON.stringify(newCodes))
}

export const delCode = async (data: ICode) => {
  if (Cookies.get('tableName')) {
    delData(Cookies.get('tableName'), data)
  }
  const codes: ICode[] = localStorage.getItem('tableName')
    ? JSON.parse(localStorage.getItem('tableName'))
    : []
  const newCodes = codes.filter((ele) => ele.id !== data.id)
  localStorage.setItem('tableName', JSON.stringify(newCodes))
}