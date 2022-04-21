import { useContext, useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import BatteryCharging80Icon from '@mui/icons-material/BatteryCharging80'

import { CodesCardsDialog } from '../components/dialogs/CodesCardsDialog'
import { GlobalContext } from '../App'
import { LAWS } from "../data/laws"
import { ICode } from '../interface'

const head = [
  '法條',
  <BatteryCharging80Icon fontSize='inherit' />,
]

export const Dashboard = () => {
  const { codes, isFetching } = useContext(GlobalContext)
  const [progress, setProgress] = useState<TypeProgress>({})

  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [reviewCodes, setReviewCodes] = useState<ICode[]>([])
  const [reviewTitle, setReviewTitle] = useState<string>('尚未選取法條')

  useEffect(() => {
    if (!codes) return
    const newProgress: TypeProgress = {}
    codes.forEach((code) => {
      if (newProgress[code.law]) { newProgress[code.law].codes.push(code) }
      else {
        newProgress[code.law] = { codes: [] }
        newProgress[code.law].codes.push(code)
      }
    })
    setProgress(newProgress)
  }, [codes])

  return (
    <main>
      {codes === null || isFetching
        ? null
        :
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {head.map((h, i) => (
                  <TableCell key={i} sx={{ textAlign: i ? 'center' : 'left', fontWeight: 'bold' }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {LAWS.map((l, i) => {
                return (
                  <TableRow key={i} className='cursor-pointer hover:bg-slate-300'
                    onClick={() => {
                      setReviewTitle(l)
                      setOpenDialog(true)
                      setReviewCodes(progress[l] && progress[l].codes ? progress[l].codes : [])
                    }}
                  >
                    <TableCell>{l}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{progress[l] && progress[l].codes ? progress[l].codes.length : 0}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      }

      <CodesCardsDialog
        open={openDialog}
        setOpen={setOpenDialog}
        codes={reviewCodes}
        lawName={reviewTitle}
      />
    </main>
  )
}

type TypeProgress = {
  [key: string]: {
    codes: ICode[],
  }
}
