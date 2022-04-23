import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import CodeCard from '../CodeCard'
import { ICode } from '../../interface'
import { Typography } from '@mui/material'

export const CodesCardsDialog = ({
  open,
  setOpen,

  lawName,
  codes,
}: {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,

  lawName: string,
  codes: ICode[],
}) => {
  const handleClickCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClickCancel}>
      <DialogTitle>{lawName}</DialogTitle>
      <DialogContent>
        {codes.length === 0
        ?(
          <Typography component='p'>
            還沒有這個法規的複習卡，趕快新增吧！
          </Typography>
        )
        : codes.map((code) => {
          return (
            <CodeCard code={code} key={code.id} />
          )
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickCancel} color='warning'>關閉</Button>
      </DialogActions>
    </Dialog>
  )
}