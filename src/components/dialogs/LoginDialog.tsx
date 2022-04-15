import Cookies from 'js-cookie'
import { useState } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export const LoginDialog = ({
  open,
  setOpen,
}: {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}) => {
  const [input, setInput] = useState<string>('')

  const handleClickCancel = () => {
    setOpen(false)
  }

  const handleClickSubmit = () => {
    setOpen(false)
    Cookies.set('tableName', input, {
      sameSite: 'lax',
    })
  }

  const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClickCancel}>
        <DialogTitle>輸入使用者名稱</DialogTitle>
        <DialogContent>
          <DialogContentText>
            使用者名稱必須正確輸入，否則無法使用本站功能。
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="使用者名稱"
            fullWidth
            variant="standard"
            onInput={handleOnInput}
            value={input}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCancel}>取消</Button>
          <Button onClick={handleClickSubmit} color='primary'>登入</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
