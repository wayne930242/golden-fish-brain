import { useState, useContext, useEffect } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { MySnackbarAlert } from '../alert/MySnackbarAlert'
import { loginAction } from '../../actions/sessionActions'

import { GlobalContext } from '../../App'
import { Typography } from '@mui/material'

export const LoginDialog = ({
  open,
  setOpen,
}: {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}) => {
  const [input, setInput] = useState<string>('')
  const { dispatch, session } = useContext(GlobalContext)

  const [openAlert, setOpenAlert] = useState<boolean>(false)

  const isLogin = session.state === 'login'
  const hasError = session.state === 'error'

  const handleClickCancel = () => {
    setOpen(false)
  }

  const handleClickSubmit = async () => {
    loginAction(dispatch, input.toLowerCase())
      .then(() => {
        setOpen(false)
      })
      .catch(() => {
        setOpenAlert(true)
      })
  }

  const handleClickCloseAlert = () => {
    setOpenAlert(false)
  }

  useEffect(() => {
    if (isLogin) setOpen(false)
  }, [isLogin])

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
          {hasError
            ?
            <MySnackbarAlert open={openAlert} onClose={handleClickCloseAlert}>
              使用者名稱是錯誤的！
            </MySnackbarAlert>
            : null
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCancel}>取消</Button>
          <Button onClick={handleClickSubmit} color='primary'>登入</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
