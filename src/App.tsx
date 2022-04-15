import React, { useState, createContext } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

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
  hasPeeped: false,
  link: '',
  createTime: null,
  editTime: null,
  reviewTime: null,
}

export const GlobalContext = createContext<{ codes: ICode[], dispatch: React.Dispatch<IAction<ICode | ICode[]>>, isFetching: boolean, setIsFetching: React.Dispatch<React.SetStateAction<boolean>> }>({
  codes: [],
  dispatch: null,
  isFetching: false,
  setIsFetching: null,
})

const startTime = {
  'today': 1000 * 60 * 60 * 24,
  'threeDay': 3 * 1000 * 60 * 60 * 24,
  'week': 7 * 1000 * 60 * 60 * 24,
  'all': -Infinity,
}

const filterResult = (filter: 'today' | 'threeDay' | 'week' | 'all', codeTime: number) => {
  return codeTime >= Date.now() - startTime[filter]
}

export default function App() {
  const [openAdd, setOpenAdd] = useState<boolean>(false)

  const [filter, setFilter] = useState<'today' | 'threeDay' | 'week' | 'all'>('today')

  const { codes, dispatch, isFetching, setIsFetching } = useCodes()

  const [newCode, setNewCode] = useState<ICode>(initialCode)

  const handleOnClickSD = () => {
    setNewCode(c => {
      return {
        ...c,
        id: codes ? codes.length : 0,
        createTime: Date.now(),
        editTime: Date.now(),
        reviewTime: Date.now(),
      }
    })
    setOpenAdd(true)
  }

  return (
    <GlobalContext.Provider value={{ codes, dispatch, isFetching, setIsFetching }}>
      <Container maxWidth="sm">
        <Paper sx={{ mx: 2, height: '95vh', overflowY: 'scroll'}}>
          <MyAppBar />
          <MySpeedDial handleOnClick={handleOnClickSD} />
          <div className='flex flex-row justify-start pl-8 py-8'>
            <img src={Logo} className="h-10" alt="logo" />
            <Typography variant="h4" component="h1" gutterBottom>
              <span className='ml-1'>搶救金魚腦</span>
            </Typography>
          </div>

          <div className='flex flex-row justify-center'>

          </div>

          <div className='px-8'>
            <Typography component='h2' variant='h5'>近期進度</Typography>
            <Divider />
            {codes ? codes
              .filter(code => filterResult(filter, code.createTime))
              .map(code => (
                <CodeCard code={code} />
              ))
              : null}
          </div>

          <AddTaskDialog open={openAdd} setOpen={setOpenAdd} newCode={newCode} setNewCode={setNewCode} />
        </Paper>
      </Container>
    </GlobalContext.Provider>
  )
}
