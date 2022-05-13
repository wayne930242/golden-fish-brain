import React, { useState } from 'react'
import {
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
} from '@mui/material'

import MenuBookIcon from '@mui/icons-material/MenuBook'
import MoodBadIcon from '@mui/icons-material/MoodBad'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'

import { timeParser } from '../../helper/view'
import { ICode } from '../../interface'

const fullHead: React.ReactNode[] = [
  '日期',
  '內容',
  '5m',
  '30m',
  '12h',
  '2d',
  '4d',
  '7d',
  '15d',
  '>30d',
]

const simpleHead: React.ReactNode[] = [
  '日期',
  '內容',
  '2d',
  '4d',
  '7d',
  '15d',
  '>30d',
]

const FamiliarIcon: React.ReactNode[] = [
  <MoodBadIcon color='error' />,
  <SentimentDissatisfiedIcon color='warning' />,
  <SentimentSatisfiedAltIcon color='success' />,
]

export const SumTable = ({
  codes,
  onClickItem,
}: TypeProps) => {
  const [mode, setMode] = useState<TypeMode>('simple')
  const head: React.ReactNode[] = mode === 'full' ? fullHead : simpleHead

  return (
    <Table stickyHeader size='small' sx={{ width: mode === 'simple' ? 515 : 800 }}>
      <TableHead>
        <TableRow>
          {head.map((h, i) => (
            <TableCell key={i}>
              {h}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {codes.sort((code1, code2) => code1.createTime - code2.createTime).map((code, i) => {
          return (
            <TableRow key={i} className='cursor-pointer hover:bg-slate-300'
              onClick={() => onClickItem(code)}
            >
              <TableCell>
                {timeParser(code.createTime, true)}
              </TableCell>
              <TableCell>
                {code.title}
              </TableCell>
              <TableCell>
              </TableCell>
              <TableCell>
              </TableCell>
              <TableCell>
              </TableCell>
              <TableCell>
              </TableCell>
              <TableCell>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

type TypeProps = {
  codes: ICode[],
  onClickItem: (code: ICode) => any,
}

type TypeMode = 'simple' | 'full'
