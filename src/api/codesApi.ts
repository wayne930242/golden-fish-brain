import {
  fetchData,
  putData,
  patchData,
  delData,
} from "./AwsFunctions"

import { ICode } from '../interface'

export const fetchCodes = () => {
  return fetchData('codes')
}

export const putCodes = (data: ICode) => {
  return putData('codes', data)
}

export const patchCodes = (data: ICode) => {
  return patchData('codes', data)
}

export const delCodes = (data: ICode) => {
  if (data.id === null) {
    console.error('Data id can not be null', data)
    return null
  }

  return delData('codes', data.id)
}
