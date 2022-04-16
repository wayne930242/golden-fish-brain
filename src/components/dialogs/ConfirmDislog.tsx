import Cookies from 'js-cookie'
import React, { useState } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export const ConfirmDialog = ({
  open,
  setOpen,

  title,
  contentText,

  onClick,
}: {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,

  title: string,
  contentText: string,

  onClick: () => any,
}) => {
  const handleClickCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setOpen(false)
  }

  const handleClickConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setOpen(false)
    onClick()
  }

  return (
    <Dialog open={open} onClose={handleClickCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickCancel}>取消</Button>
        <Button onClick={handleClickConfirm} color='warning'>確認</Button>
      </DialogActions>
    </Dialog>
  )
}