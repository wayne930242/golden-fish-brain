import { useContext, useEffect, useState } from 'react'
import BatteryCharging80Icon from '@mui/icons-material/BatteryCharging80'

import {
  Typography,
  Button,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Stack,
  Paper,
} from '@mui/material'

import { CodesCardsDialog } from '../components/dialogs/CodesCardsDialog'
import { GlobalContext } from '../App'
import { LAWS } from "../data/laws"
import { ICode } from '../interface'

const head = [
  '法條',
  <BatteryCharging80Icon fontSize='inherit' />,
]

export const Dashboard = () => {
  const { codes, isFetching } = useContext(GlobalContext)
  const [progress, setProgress] = useState<TypeProgress>({})

  const [mode, setMode] = useState<TypeModes>('byLaw')

  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [reviewCodes, setReviewCodes] = useState<ICode[]>([])
  const [reviewTitle, setReviewTitle] = useState<string>('尚未選取法條')

  useEffect(() => {
    if (!codes) return
    const newProgress: TypeProgress = {}
    codes.forEach((code) => {
      if (newProgress[code.law]) { newProgress[code.law].codes.push(code) }
      else {
        newProgress[code.law] = { codes: [] }
        newProgress[code.law].codes.push(code)
      }
    })
    setProgress(newProgress)
  }, [codes])

  return (
    <main>
      <div className='py-6 my-6'>
        <Stack sx={{ marginBottom: 6 }} direction='row' spacing={2}>
          <Button
            color='primary'
            variant={mode === 'byLaw' ? 'outlined' : 'contained'}
            onClick={() => { setMode('byLaw') }}
          >
            一覽
          </Button>
          <Button
            color='info'
            variant={mode === 'byHistory' ? 'outlined' : 'contained'}
            onClick={() => { setMode('byHistory') }}
          >
            歷史
          </Button>
        </Stack>

        <Typography component='h2' align='center' variant='h4' sx={{ marginBottom: 2 }}>{mode === 'byLaw' ? '一覽' : '複習歷史'} </Typography>

        <Paper sx={{ px: 2, pb: 4 }}>
          {codes === null || isFetching
            ? null
            : mode === 'byLaw'
              ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {head.map((h, i) => (
                          <TableCell key={i} sx={{ textAlign: i ? 'center' : 'left', fontWeight: 'bold' }}>
                            {h}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {LAWS.map((l, i) => {
                        return (
                          <TableRow key={i} className='cursor-pointer hover:bg-slate-300'
                            onClick={() => {
                              setReviewTitle(l)
                              setOpenDialog(true)
                              setReviewCodes(progress[l] && progress[l].codes ? progress[l].codes : [])
                            }}
                          >
                            <TableCell>{l}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{progress[l] && progress[l].codes ? progress[l].codes.length : 0}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )
              : null
          }
        </Paper>

        <CodesCardsDialog
          open={openDialog}
          setOpen={setOpenDialog}
          codes={reviewCodes}
          lawName={reviewTitle}
        />
      </div>
    </main>
  )
}

type TypeProgress = {
  [key: string]: {
    codes: ICode[],
  }
}

type TypeModes = 'byLaw' | 'byHistory'
