import React, { useState, createContext, useEffect } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Cookies from 'js-cookie'

import { Banner } from './components/Banner'
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
  home: '',
  dashboard: '一覽',
}

const Title = ({ router }: { router: TypeRouter }) => (
  <div className='flex flex-row justify-start py-8'>
    {/* <img src={Logo} className="h-10 mr-3" alt="logo" /> */}
    <Typography sx={{ width: '100%' }} align='center' variant="h4" component="div" gutterBottom>
      {title[router]}
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
      <div className='bg-zinc-800 relative'>
        <Container className="h-screen overflow-y-scroll" >
          <MyAppBar router={router} setRouter={setRouter} />
          <Banner />

          <div className='px-8 bg-slate-50'>
            <Title router={router} />
            {routerMap[router]}
          </div>

          <MySpeedDial handleOnClick={handleOnClickSpeedDial} />
          <AddTaskDialog open={openAdd} setOpen={setOpenAdd} newCode={newCode} setNewCode={setNewCode} />
        </Container>
      </div>
    </GlobalContext.Provider >
  )
}
