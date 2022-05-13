import { useContext, useEffect, useState } from 'react'

import {
  Typography,
  Button,
  Stack,
  Paper,
} from '@mui/material'

import { makeCodesHistory, TypeHistory } from '../helper/data'
import { CodesCardsDialog } from '../components/dialogs/CodesCardsDialog'

import { History } from '../components/Dashboard/History'
import { LawTable } from '../components/Dashboard/LawTable'

import { GlobalContext } from '../App'
import { ICode } from '../interface'

export const Dashboard = () => {
  const { codes, isFetching } = useContext(GlobalContext)

  const [mode, setMode] = useState<TypeModes>('byLaw')

  const [history, setHistory] = useState<TypeHistory>({})

  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [reviewCodes, setReviewCodes] = useState<ICode[]>([])
  const [reviewTitle, setReviewTitle] = useState<string>('尚未選取法條')

  useEffect(() => {
    if (mode === 'byLaw') return
    setHistory(makeCodesHistory(codes))
  }, [mode, codes])

  const components: {
    [key: string]: JSX.Element,
  } = {
    byLaw: (
      <LawTable
        codes={codes}
        onClickLaw={(law: string, progress: TypeProgress) => {
          setReviewTitle(law)
          setOpenDialog(true)
          setReviewCodes(progress[law] && progress[law].codes ? progress[law].codes : [])
        }}
      />
    ),
    byHistory: (
      <History
        history={history}
        onClickItem={(code: ICode) => {
          setReviewTitle(null)
          setOpenDialog(true)
          setReviewCodes([code])
        }}
      />
    ),
  }

  return (
    <main>
      <div className='py-6 my-6'>
        <Stack sx={{ marginBottom: 6 }} direction='row' spacing={2}>
          <Button
            color='primary'
            variant={mode === 'byLaw' ? 'contained' : 'outlined'}
            onClick={() => { setMode('byLaw') }}
          >
            一覽
          </Button>
          <Button
            color='primary'
            variant={mode === 'byHistory' ? 'contained' : 'outlined'}
            onClick={() => { setMode('byHistory') }}
          >
            歷史
          </Button>
          <Button
            color='primary'
            variant={mode === 'table' ? 'contained' : 'outlined'}
            onClick={() => { setMode('table') }}
          >
            表格
          </Button>
        </Stack>

        <Typography component='h2' align='center' variant='h4' sx={{ marginBottom: 2 }}>{mode === 'byLaw' ? '一覽' : '複習歷史'} </Typography>

        <Paper sx={{ px: 2, pb: 4 }}>
          {codes === null || isFetching
            ? null
            : components[mode] ?? null
          }
        </Paper>

        <CodesCardsDialog
          open={openDialog}
          setOpen={setOpenDialog}
          codes={reviewCodes}
          lawName={reviewTitle}
        />
      </div >
    </main >
  )
}

type TypeModes = 'byLaw' | 'byHistory' | 'table'

type TypeProgress = {
  [key: string]: {
    codes: ICode[],
  }
}
