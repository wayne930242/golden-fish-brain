import { useState, createContext, useEffect } from 'react'
import { use100vh } from 'react-div-100vh'
import {
  Divider,
  Typography,
  Container,
} from '@mui/material'
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

import { QUOTATIONS } from './data/quotations'
// import Logo from './logo.png'

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

/* const title: { [key: string]: string } = {
  home: null,
  dashboard: '一覽',
}

const Title = ({ router }: { router: TypeRouter }) => (
  <>
    {title[router]
      ? (
        <div className='flex flex-row justify-start pt-6 pb-4'>
          <img src={Logo} className="h-10 mr-3" alt="logo" />
          <Typography sx={{ width: '100%' }} align='center' variant="h4" component="div" gutterBottom>
            {title[router]}
          </Typography>
        </div>
      )
      : <div className='pt-6' />
    }
  </>
)*/

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

  const vh = use100vh()

  const [newCode, setNewCode] = useState<ICode>(initialCode)

  const routerMap = {
    home: <Home />,
    dashboard: <Dashboard />,
  }

  const REFRESH_TIME = 20000
  const [randomQuote, setRandomQuote] = useState<React.ReactNode>(<></>)

  useEffect(() => {
    const makeRandomQuote = () => {
      const q = QUOTATIONS[Math.floor(QUOTATIONS.length * Math.random())]
      setRandomQuote(() => (
        <div>
          <p className='text-xs w-full'>{q.text}</p>
          <p className='font-bold text-xs w-full text-right'>-- {q.author}</p>
        </div>
      )
      )
    }
    makeRandomQuote()
    const timeInteval = setInterval(makeRandomQuote, REFRESH_TIME)
    return (() => {
      clearInterval(timeInteval)
    })
  }, [])

  return (
    <GlobalContext.Provider value={{
      codes,
      isFetching,
      hasError,
      session,
      dispatch,
    }}>
      <div style={{ height: vh }} className='bg-zinc-800 overflow-y-hidden flex flex-row justify-center w-full'>
        <div className='w-full relative' style={{ maxWidth: 600 }}>
          <Container sx={{ height: vh }} className="overflow-y-auto overflow-x-hidden" disableGutters>
            <MyAppBar router={router} setRouter={setRouter} />
            <Banner />

            <div className='px-4 bg-slate-50 pb-6'>
              {routerMap[router]}

              {/* Footer */}
              <Divider />
              <div className='mt-4 ml-4 mr-24'>
                {isFetching ? '載入中...' : randomQuote}
              </div>
            </div>


          </Container>
          <MySpeedDial handleOnClick={handleOnClickSpeedDial} />
          <AddTaskDialog open={openAdd} setOpen={setOpenAdd} newCode={newCode} setNewCode={setNewCode} />
        </div>
      </div >
    </GlobalContext.Provider >
  )
}
