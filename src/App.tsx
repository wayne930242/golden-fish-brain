import { useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Paper } from '@mui/material'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'

import AddTaskDialog from './components/AddTaskDialog'
import MySpeedDial from './components/MySpeedDial'

export default function App() {
  const [openAdd, setOpenAdd] = useState<boolean>(false)

  const handleOnClickSD = () => {
    setOpenAdd(true)
  }

  return (
    <Container maxWidth="sm">
      <Paper sx={{ my: 4, mx: 6, py: 2 }}>
        <Typography variant="h5" align="center" component="h1" gutterBottom>
          <TipsAndUpdatesIcon fontSize='inherit' />
          <span className='ml-1'>搶救金魚腦</span>
        </Typography>

        <MySpeedDial handleOnClick={handleOnClickSD} />
        <AddTaskDialog open={openAdd} setOpen={setOpenAdd} />
      </Paper>
    </Container>
  )
}
