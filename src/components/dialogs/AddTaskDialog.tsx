import React, { useState, useContext } from 'react'

import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

import { MySnackbarAlert } from '../alert/MySnackbarAlert'
import { EditContent } from '../EditContent'
import { putCode } from '../../actions/codesActions'
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
  const { dispatch } = useContext(GlobalContext)
  const [openAlert, setOpenAlert] = useState<boolean>(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOnSubmit = () => {
    if (newCode.title.trim() === '') {
      setOpenAlert(true)
      return
    }

    putCode(dispatch.codes, {
      ...newCode,
      createTime: Date.now(),
      editTime: Date.now(),
    })
    setNewCode(initialCode)
    setOpen(false)
  }

  const handleOnCancel = () => {
    setNewCode(initialCode)
    setOpen(false)
  }

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>新增複習卡</DialogTitle>
      <DialogContent>
        <div className='mt-4'>
          <EditContent code={newCode} setCode={setNewCode} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='error' onClick={handleOnCancel}>
          取消
        </Button>
        <Button variant='contained' color='primary' onClick={handleOnSubmit}>
          新增
        </Button>
      </DialogActions>

      <MySnackbarAlert open={openAlert} onClose={handleCloseAlert}>
        忘了寫標題囉。
      </MySnackbarAlert>

    </Dialog >
  )
}

export default AddTaskDialog
