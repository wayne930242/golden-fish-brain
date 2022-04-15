import React, { useState, useContext } from 'react'

import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

import { EditContent } from '../EditContent'
import { fetchCodes, putCode } from '../../api/codesApi'
import { ICode } from '../../interface'
import { initialCode, GlobalContext } from '../../App'

export const AddTaskDialog = ({
  open,
  setOpen,
  newCode,
  setNewCode,
}: {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  newCode: ICode,
  setNewCode: React.Dispatch<React.SetStateAction<ICode>>,
}) => {
  const { codes, dispatch, isFetching, setIsFetching } = useContext(GlobalContext)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOnSubmit = () => {
    (async () => {
      setIsFetching(true)
      putCode({...newCode,
        editTime: Date.now()
      })
        .then(async () => {
          const data = await fetchCodes()
          dispatch({ type: 'fetchCodes', payload: data })
        })
        .finally(() => {
          setNewCode(initialCode)
          setOpen(false)
        })
      setIsFetching(false)
    })()
  }

  const handleOnCancel = () => {
    setNewCode(initialCode)
    setOpen(false)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>新進度</DialogTitle>
      <DialogContent>
        <EditContent code={newCode} setCode={setNewCode} />
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='error' onClick={handleOnCancel}>
          取消
        </Button>
        <Button variant='contained' color='primary' onClick={handleOnSubmit}>
          新增
        </Button>
      </DialogActions>

    </Dialog >
  )
}

export default AddTaskDialog
