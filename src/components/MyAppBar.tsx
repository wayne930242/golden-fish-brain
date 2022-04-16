import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { QUOTATIONS } from '../data/quotations'

import { LoginDialog } from './dialogs/LoginDialog'

export default function ButtonAppBar() {
  const [openLogin, setOpenLogin] = useState<boolean>(false)

  const REFRESH_TIME = 15000
  const [randomQuote, setRandomQuote] = useState<string>('')

  useEffect(() => {
    if (Cookies.get('tableName')) return
    setOpenLogin(true)
  }, [])

  useEffect(() => {
    const makeRandomQuote = () => {
      const q = QUOTATIONS[Math.floor(QUOTATIONS.length * Math.random())]
      setRandomQuote(() => q.text + ' -- ' + q.author)
    }
    makeRandomQuote()
    const timeInteval = setInterval(makeRandomQuote, REFRESH_TIME)
    return (() => {
      clearInterval(timeInteval)
    })
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
          <Typography sx={{
            fontSize: '0.7rem',
            my: 1,
            flexGrow: 1,
          }} variant="body2" component="p" >
            {randomQuote}
          </Typography>
          <Button color="inherit" size='small' onClick={() => setOpenLogin(true)}>登入</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}