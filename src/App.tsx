import React, { useState, createContext, useEffect } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Cookies from 'js-cookie'

import AddTaskDialog from './components/dialogs/AddTaskDialog'
import MySpeedDial from './components/MySpeedDial'
import MyAppBar from './components/MyAppBar'
import { Dashboard } from './pages/Dashboard'
import { Home } from './pages/Home'

import { useMyReducer } from './reducers'
import { fetchCodes } from './actions/codesActions'
import { LAWS } from './data/laws'
import { ICode, TypeDispatch, ISession, TypeRouter } from './interface'

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

const title: { [key: string]: string } = {
  home: '搶救金魚腦',
  dashboard: '儀表板',
}

const Title = ({ router }: { router: TypeRouter }) => (
  <div className='flex flex-row justify-start pl-8 py-8'>
    <img src={Logo} className="h-10" alt="logo" />
    <Typography variant="h4" component="h1" gutterBottom>
      <span className='ml-3'>{title[router]}</span>
    </Typography>
  </div>
)

export default function App() {
  const [openAdd, setOpenAdd] = useState<boolean>(false)

  const { state, dispatch } = useMyReducer()

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

  useEffect(() => {
    fetchCodes(dispatch.codes)
  }, [])

  useEffect(() => {
    if (Cookies.get('tableName')) {
      dispatch.session({ type: 'login', payload: Cookies.get('tableName') })
    }
  }, [])

  const session = state.session
  const codes = state.codes.data
  const isFetching = state.codes.state === 'fetching'
  const hasError = state.codes.state === 'error'

  const [router, setRouter] = useState<TypeRouter>('home')
  const [newCode, setNewCode] = useState<ICode>(initialCode)

  const routerMap = {
    home: <Home />,
    dashboard: <Dashboard />,
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
          <MyAppBar router={router} setRouter={setRouter} />
          <MySpeedDial handleOnClick={handleOnClickSpeedDial} />

          <Title router={router} />

          <div className='px-8'>

            {routerMap[router]}

          </div>

          <AddTaskDialog open={openAdd} setOpen={setOpenAdd} newCode={newCode} setNewCode={setNewCode} />
        </Paper>
      </Container>
    </GlobalContext.Provider >
  )
}
