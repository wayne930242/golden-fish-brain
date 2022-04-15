import { useState, createContext } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Paper } from '@mui/material'

import { useCodes } from './hooks/codesHooks'
import { LAWS } from './data/laws'
import Logo from './logo.png'
import AddTaskDialog from './components/dialogs/AddTaskDialog'
import MySpeedDial from './components/MySpeedDial'
import MyAppBar from './components/MyAppBar'
import { ICode, IAction } from './interface'

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

export const GlobalContext = createContext<{ codes: ICode[], dispatch: React.Dispatch<IAction<ICode | ICode[]>>, isFetching: boolean }>({
  codes: [],
  dispatch: null,
  isFetching: false,
})

export default function App() {
  const [openAdd, setOpenAdd] = useState<boolean>(false)

  const handleOnClickSD = () => {
    setOpenAdd(true)
  }
  const { codes, dispatch, isFetching } = useCodes()

  const [newCode, setNewCode] = useState<ICode>(initialCode)

  return (
    <GlobalContext.Provider value={{ codes, dispatch, isFetching }}>
      <Container maxWidth="sm">
        <Paper sx={{ mx: 2 }}>
          <MyAppBar />
          <div className='flex flex-row justify-start pl-8 py-8'>
            <img src={Logo} className="h-10" alt="logo" />
            <Typography variant="h4" component="h1" gutterBottom>
              <span className='ml-1'>搶救金魚腦</span>
            </Typography>
          </div>

          <Paper sx={{ height: '100%' }}>

          </Paper>

          <MySpeedDial handleOnClick={handleOnClickSD} />
          <AddTaskDialog open={openAdd} setOpen={setOpenAdd} newCode={newCode} setNewCode={setNewCode} />
        </Paper>
      </Container>
    </GlobalContext.Provider>
  )
}
