import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

import { LoginDialog } from './dialogs/LoginDialog'

export default function ButtonAppBar() {
  const [openLogin, setOpenLogin] = useState<boolean>(false)

  useEffect(() => {
    if (Cookies.get('tableName')) return
    setOpenLogin(true)
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <LoginDialog
        open={openLogin}
        setOpen={setOpenLogin}
      />
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            每日功課
          </Typography>
          <Button color="inherit" onClick={() => setOpenLogin(true)}>登入</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}