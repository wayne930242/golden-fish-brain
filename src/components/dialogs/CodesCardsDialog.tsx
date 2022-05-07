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

  const numsSort = (num1: string, num2: string): number => {
    const splitNum1 = num1.split('-')
    const splitNum2 = num2.split('-')
    for (let i = 0; i <= 1; i++) {
      if (Number(splitNum1[i]) > Number(splitNum2[i])) return 1
      if (Number(splitNum1[i]) < Number(splitNum2[i])) return -1
    }
    return 0
  }

  return (
    <Dialog open={open} onClose={handleClickCancel}>
      {lawName ? <DialogTitle>【{lawName}】</DialogTitle> : null}
      <DialogContent sx={{ padding: 0 }}>
        {codes.length === 0
          ? (
            <Typography component='p'>
              還沒有這個法規的複習卡，趕快新增吧！
            </Typography>
          )
          : codes.sort((code1, code2) => {
            if (code1.nums.length === 0 || code2.nums.length === 0) return 0
            const num1 = code1.nums.sort((n1, n2) => numsSort(n2, n1))[code1.nums.length - 1]
            const num2 = code2.nums.sort((n1, n2) => numsSort(n2, n1))[code2.nums.length - 1]
            return numsSort(num1, num2)
          }).map((code) => {
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
