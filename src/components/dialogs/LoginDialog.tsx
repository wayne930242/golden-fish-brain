import Cookies from 'js-cookie'
import { useState, useContext } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { fetchCodes } from '../../api/codesApi'
import { GlobalContext } from '../../App'

export const LoginDialog = ({
  open,
  setOpen,
}: {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}) => {
  const [input, setInput] = useState<string>('')
  const { codes, dispatch, isFetching, setIsFetching } = useContext(GlobalContext)

  const handleClickCancel = () => {
    setOpen(false)
  }

  const handleClickSubmit = async () => {
    setOpen(false)
    Cookies.set('tableName', input, {
      sameSite: 'lax',
    });

    setIsFetching(true)
    const data = await fetchCodes()
    dispatch({ type: 'fetchCodes', payload: data })
    setIsFetching(false)
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
