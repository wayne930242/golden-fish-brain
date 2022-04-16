import React, { useState, createContext } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import { Stack } from '@mui/material'

import CodeCard from './components/CodeCard'
import AddTaskDialog from './components/dialogs/AddTaskDialog'
import MySpeedDial from './components/MySpeedDial'
import MyAppBar from './components/MyAppBar'

import { useCodes } from './hooks/codesHooks'
import { LAWS } from './data/laws'
import { ICode, IAction } from './interface'

import Logo from './logo.png'

export const initialCode: ICode = {
  id: null,
  title: '',
  law: LAWS[0],
  nums: [],
  star: 1,
  familiar: null,
  note: '',
  hasPeeped: [false],
  link: '',
  createTime: null,
  editTime: null,
  reviewTime: [],
}

export const GlobalContext = createContext<{ codes: ICode[], dispatch: React.Dispatch<IAction<ICode | ICode[]>>, isFetching: boolean, setIsFetching: React.Dispatch<React.SetStateAction<boolean>> }>({
  codes: [],
  dispatch: null,
  isFetching: false,
  setIsFetching: null,
})

const startTime: TypeStartTime = {
  today: 1000 * 60 * 60 * 24,
  threeDay: 3 * 1000 * 60 * 60 * 24,
  week: 7 * 1000 * 60 * 60 * 24,
  all: Infinity,
}

const startTimeText: TypeStartTimeText = {
  today: '今天',
  threeDay: '三天',
  week: '一週',
  all: '全部',
}

type TypeStartTimeText = {
  today: string,
  threeDay: string,
  week: string,
  all: string,
}

type TypeStartTime = {
  today: number,
  threeDay: number,
  week: number,
  all: number,
}

const filterResult = (filter: 'today' | 'threeDay' | 'week' | 'all', codeTime: number) => {
  return codeTime >= Date.now() - startTime[filter]
}

export default function App() {
  const [openAdd, setOpenAdd] = useState<boolean>(false)

  const [filter, setFilter] = useState<'today' | 'threeDay' | 'week' | 'all'>('today')
  const handleOnFilter = (f: 'today' | 'threeDay' | 'week' | 'all') => {
    setFilter(f)
  }

  const { codes, dispatch, isFetching, setIsFetching } = useCodes()

  const [newCode, setNewCode] = useState<ICode>(initialCode)

  const handleOnClickSD = () => {
    setNewCode(c => {
      return {
        ...c,
        id: String(codes ? codes.length : 0) + String(Date.now()),
        createTime: Date.now(),
        editTime: Date.now(),
        reviewTime: [Date.now()],
      }
    })
    setOpenAdd(true)
  }

  return (
    <GlobalContext.Provider value={{ codes, dispatch, isFetching, setIsFetching }}>
      <Container maxWidth="sm">
        <Paper sx={{ mx: 2, height: '95vh', overflowY: 'scroll' }}>
          <MyAppBar />
          <MySpeedDial handleOnClick={handleOnClickSD} />
          <div className='flex flex-row justify-start pl-8 py-8'>
            <img src={Logo} className="h-10" alt="logo" />
            <Typography variant="h4" component="h1" gutterBottom>
              <span className='ml-1'>搶救金魚腦</span>
            </Typography>
          </div>

          <div className='px-8'>

            <div className='mb-6'>
              <Stack direction="row" spacing={2}>
                {
                  Object.keys(startTimeText).map((key: keyof TypeStartTimeText) => (
                    <Button onClick={() => handleOnFilter(key)} variant={filter !== key ? 'outlined' : 'contained'} color='primary' size='small' key={key}>
                      {startTimeText[key]}
                    </Button>
                  ))
                }
              </Stack>
            </div>

            <Typography component='h2' variant='h5'>複習卡</Typography>
            <Divider />
            {isFetching
              ?
              <div className='flex flex-row justify-center'>
                <CircularProgress />
              </div>
              : codes
                ? codes
                  .filter(code => filterResult(filter, code.createTime))
                  .map(code => (
                    <CodeCard code={code} key={code.id} />
                  ))
                : null}
          </div>

          <AddTaskDialog open={openAdd} setOpen={setOpenAdd} newCode={newCode} setNewCode={setNewCode} />
        </Paper>
      </Container>
    </GlobalContext.Provider>
  )
}
