import { useEffect, useState } from 'react'
import {
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from '@mui/material'
import BatteryCharging80Icon from '@mui/icons-material/BatteryCharging80'

import { LAWS } from "../../data/laws"
import { ICode } from '../../interface'

const head = [
  '法條',
  <BatteryCharging80Icon fontSize='inherit' />,
]

export const LawTable = ({
  codes,
  onClickLaw,
}: TypeProps) => {
  const [progress, setProgress] = useState<TypeProgress>({})

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
          {LAWS.map((law, i) => {
            return (
              <TableRow key={i} className='cursor-pointer hover:bg-slate-300'
                onClick={() => onClickLaw(law, progress)}
              >
                <TableCell>{law}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{progress[law] && progress[law].codes ? progress[law].codes.length : 0}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

type TypeProps = {
  codes: ICode[],
  onClickLaw: (law: string, progress: TypeProgress) => any,
}

type TypeProgress = {
  [key: string]: {
    codes: ICode[],
  }
}
