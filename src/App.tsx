import React, { useState, createContext, useEffect } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import {
  Stack,
  TextField,
} from '@mui/material'

import CodeCard from './components/CodeCard'
import AddTaskDialog from './components/dialogs/AddTaskDialog'
import MySpeedDial from './components/MySpeedDial'
import MyAppBar from './components/MyAppBar'

import { useSession } from './hooks/useSession'
import { useMyReducer } from './reducers'
import { LuckyCodes } from './helper/data'
import { fetchCodes } from './actions/codesActions'
import { LAWS } from './data/laws'
import { ICode, TypeDispatch, ISession } from './interface'

import Logo from './logo.png'

export const initialCode: ICode = {
  id: null,
  title: '',
  law: LAWS[0],
  nums: [],
  star: 1,
  note: '',
  link: '',
  createTime: null,
  editTime: null,
  hasPeeped: [],
  familiar: [],
  reviewTime: [],
}

export const GlobalContext = createContext<TypeGlobalContext>({
  codes: null,
  session: {
    name: null,
    state: 'idle',
  },
  hasError: false,
  isFetching: false,
  dispatch: null,
})

type TypeGlobalContext = {
  codes: ICode[],
  session: ISession,
  isFetching: boolean,
  hasError: boolean,
  dispatch: TypeDispatch,
}

const startTime: TypeStartTime = {
  today: 1000 * 60 * 60 * 24,
  all: Infinity,
}

const startTimeText: TypeStartTimeText = {
  today: '今天',
  all: '全部',
}

type TypeStartTimeText = {
  today: string,
  all: string,
}

type TypeStartTime = {
  today: number,
  all: number,
}

const Title = () => (
  <div className='flex flex-row justify-start pl-8 py-8'>
    <img src={Logo} className="h-10" alt="logo" />
    <Typography variant="h4" component="h1" gutterBottom>
      <span className='ml-1'>搶救金魚腦</span>
    </Typography>
  </div>
)

const Loading = () => (
  <div className='flex flex-row justify-center my-20'>
    <CircularProgress />
  </div>
)

const filterResult = (filter: keyof TypeStartTimeText, codeTime: number) => {
  return codeTime >= Date.now() - startTime[filter]
}

export default function App() {
  const [openAdd, setOpenAdd] = useState<boolean>(false)

  const [filter, setFilter] = useState<keyof TypeStartTimeText>('all')
  const handleOnFilter = (f: keyof TypeStartTimeText) => {
    setFilter(f)
  }

  const defaultValue: number = 5
  const [value, setValue] = useState<number>(defaultValue)

  const { state, dispatch } = useMyReducer()

  useEffect(() => {
    fetchCodes(dispatch.codes)
  }, [])

  const session = state.session 
  const codes = state.codes.data
  const isFetching = state.codes.state === 'fetching'
  const hasError = state.codes.state === 'error'

  const filteredCodes = codes !== null ? codes.filter(code => filterResult(filter, code.createTime)) : []

  const [mode, setMode] = useState<'review' | 'achive'>('achive')
  const [reviewCards, setReviewCards] = useState<ICode[]>(null)

  const [newCode, setNewCode] = useState<ICode>(initialCode)

  const handleOnClickSpeedDial = () => {
    setNewCode(c => {
      return {
        ...c,
        id: String(codes ? codes.length : 0) + String(Date.now()),
        createTime: Date.now(),
        editTime: Date.now(),
      }
    })
    setOpenAdd(true)
  }

  return (
    <GlobalContext.Provider value={{
      codes,
      isFetching,
      hasError,
      session,
      dispatch,
    }}>
      <Container maxWidth="sm">
        <Paper sx={{ mx: 2, height: '95vh', overflowY: 'scroll' }}>
          <MyAppBar />
          <MySpeedDial handleOnClick={handleOnClickSpeedDial} />

          <Title />

          <div className='px-8'>

            <div className='mb-6'>
              <div className='flex flex-row justify-between'>
                <Stack direction="row" spacing={2}>
                  <Button onClick={() => {
                    if (mode === 'review') setMode('achive')
                    if (mode === 'achive') setMode('review')
                  }} variant={'outlined'} color={mode === 'review' ? 'success' : 'info'} size='small'>
                    {mode === 'review' ? '檢視' : '複習'}
                  </Button>
                </Stack>
                <Stack direction='row' spacing={2}>
                  {mode === 'review' ? (
                    <>
                      <TextField
                        sx={{
                          width: 30,
                        }}
                        size='small'
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setValue(Number(e.target.value))
                        }}
                        defaultValue={defaultValue}
                        variant='standard'
                      />
                      <Button
                        onClick={() => {
                          setReviewCards(LuckyCodes(codes, Number(value)))
                        }}
                        size='small'
                        variant='contained'
                        color='error'
                      >
                        抽卡
                      </Button>
                    </>
                  ) :
                    Object.keys(startTimeText).map((key: keyof TypeStartTimeText) => (
                      <Button onClick={() => handleOnFilter(key)} variant={filter !== key ? 'outlined' : 'contained'} color='primary' size='small' key={key}>
                        {startTimeText[key]}
                      </Button>
                    ))
                  }
                </Stack>
              </div>
            </div>

            <Typography component='h2' variant='h5'>{mode === 'review' ? '複習中...' : '檢視複習卡'} </Typography>
            <Divider />
            {isFetching || codes === null
              ? <Loading />
              : mode === 'review'
                ? reviewCards !== null && reviewCards.length !== 0
                  ? reviewCards
                    .map(code => (
                      <CodeCard code={code} key={code.id} />
                    ))
                  : <div className='my-10'><Typography component='p' variant='body1'>抽卡或新增複習卡。</Typography></div>
                : filteredCodes.length !== 0
                  ? filteredCodes
                    .map(code => (
                      <CodeCard code={code} key={code.id} />
                    ))
                  : <div className='my-10'><Typography component='p' variant='body1'>新增複習卡或篩選「全部」複習卡。</Typography></div>
            }
          </div>

          <AddTaskDialog open={openAdd} setOpen={setOpenAdd} newCode={newCode} setNewCode={setNewCode} />
        </Paper>
      </Container>
    </GlobalContext.Provider>
  )
}
