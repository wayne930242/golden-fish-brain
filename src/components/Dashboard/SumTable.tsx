import React, { useState } from 'react'
import {
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
} from '@mui/material'

import { ReviewIcon } from '../ReviewIcons'
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
  <>1<span className='text-xs font-bold ml-3'>(2天)</span></>,
  <>2<span className='text-xs font-bold ml-3'>(4天)</span></>,
  <>3<span className='text-xs font-bold ml-3'>(7天)</span></>,
  <>4<span className='text-xs font-bold ml-3'>(15天)</span></>,
  <>5<span className='text-xs font-bold ml-3'>({'>'}30天)</span></>,
]

const getOnInteval = (from: number, to: number, code: ICode): {
  familiar: number,
  hasPeeped: boolean,
  time?: number,
} => {
  let index: number = null
  let time: number = 1

  for (let i = 0; i < code.reviewTime.length; i++) {
    if (code.reviewTime[i] >= code.createTime + from && code.reviewTime[i] < code.createTime + to) {
      index = i
      time++
    }
  }

  return {
    familiar: index !== null && code.familiar[index] ? code.familiar[index] : null,
    hasPeeped: index !== null && code.hasPeeped[index] ? code.hasPeeped[index] : null,
    time,
  }
}



export const SumTable = ({
  codes,
  onClickItem,
}: TypeProps) => {
  const [mode, setMode] = useState<TypeMode>('simple')
  const head: React.ReactNode[] = mode === 'full' ? fullHead : simpleHead

  return (
    <Table stickyHeader size='small' sx={{ width: mode === 'simple' ? 800 : 1000 }}>
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
                <ReviewIcon familiar={code.familiar[0]} hasPeeped={code.hasPeeped[0]} />
              </TableCell>
              <TableCell>
                <ReviewIcon familiar={code.familiar[1]} hasPeeped={code.hasPeeped[1]} />
              </TableCell>
              <TableCell>
                <ReviewIcon familiar={code.familiar[2]} hasPeeped={code.hasPeeped[2]} />
              </TableCell>
              <TableCell>
                <ReviewIcon familiar={code.familiar[3]} hasPeeped={code.hasPeeped[3]} />
              </TableCell>
              <TableCell>
                <ReviewIcon familiar={code.familiar[4]} hasPeeped={code.hasPeeped[4]} />
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
