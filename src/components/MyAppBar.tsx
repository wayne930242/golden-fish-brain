import { useState, useEffect, useContext } from 'react'
import Cookies from 'js-cookie'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'

import { GlobalContext } from '../App'
import DashboardIcon from '@mui/icons-material/Dashboard'
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark'
import IconButton from '@mui/material/IconButton'

import { TypeRouter } from '../interface'
import { LoginDialog } from './dialogs/LoginDialog'


export default function ButtonAppBar({
  router,
  setRouter,
}: {
  router: TypeRouter,
  setRouter: React.Dispatch<React.SetStateAction<TypeRouter>>,
}) {
  const [openLogin, setOpenLogin] = useState<boolean>(false)

  const { session } = useContext(GlobalContext)

  /* const REFRESH_TIME = 15000
  const [randomQuote, setRandomQuote] = useState<string>('') */

  useEffect(() => {
    if (Cookies.get('tableName')) return
    setOpenLogin(true)
  }, [])

  const handleRouter = (_e: React.MouseEvent<HTMLButtonElement>) => {
    if (router === 'home') setRouter('dashboard')
    if (router === 'dashboard') setRouter('home')
  }

  /* useEffect(() => {
    const makeRandomQuote = () => {
      const q = QUOTATIONS[Math.floor(QUOTATIONS.length * Math.random())]
      setRandomQuote(() => q.text + ' -- ' + q.author)
    }
    makeRandomQuote()
    const timeInteval = setInterval(makeRandomQuote, REFRESH_TIME)
    return (() => {
      clearInterval(timeInteval)
    })
  }, []) */

  return (
    <nav>
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
            {/* <Typography sx={{
            fontSize: '0.7rem',
            my: 1,
            flexGrow: 1,
          }} variant="body2" component="p" >
            {randomQuote}
        </Typography> */}

            <div className='flex flex-row justify-between w-full'>
              {session.state !== 'login'
                ? <Button color="inherit" size='small' onClick={() => setOpenLogin(true)}>登入</Button>
                : <Button color="inherit" size='small' onClick={() => setOpenLogin(true)}>目前是 {session.name}，重新登入</Button>
              }
              <IconButton color="inherit" size='small' onClick={handleRouter}>
                {router === 'home'
                  ? <DashboardIcon />
                  : <CollectionsBookmarkIcon />
                }
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </nav>
  )
}
