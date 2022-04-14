import { useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Paper, Box } from '@mui/material'

import Logo from './logo.png'
import AddTaskDialog from './components/AddTaskDialog'
import MySpeedDial from './components/MySpeedDial'
import { ICode } from './interface'

export const initialCode: ICode = {
  id: null,
  title: '',
  law: '',
  nums: [],
  star: 1,
  familiar: null,
  note: '',
  hasPeeped: false,
  link: '',
}

export default function App() {
  const [openAdd, setOpenAdd] = useState<boolean>(false)

  const handleOnClickSD = () => {
    setOpenAdd(true)
  }

  const [newCode, setNewCode] = useState<ICode>(initialCode)

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, mx: 2, py: 2 }}>
        <div className='flex flex-row justify-center'>
          <img src={Logo} className="h-10" alt="logo" />
          <Typography variant="h4" align="center" component="h1" gutterBottom>
            <span className='ml-1'>搶救金魚腦</span>
          </Typography>
        </div>

        <Paper sx={{ height: '100%' }}>

        </Paper>

        <MySpeedDial handleOnClick={handleOnClickSD} />
        <AddTaskDialog open={openAdd} setOpen={setOpenAdd} newCode={newCode} setNewCode={setNewCode} />
      </Box>
    </Container>
  )
}
