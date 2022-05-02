import { useState } from 'react'
import {
  Typography,
  Stack,
  Pagination,
  PaginationItem,
} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import { ICode } from "../interface"
import CodeCard from '../components/CodeCard'

export const CardsList = ({
  codes,
  noCardsString = '沒有可供檢視的複習卡。',
}: TypeProps) => {
  const LIMIT = 5
  const [page, setPage] = useState<number>(1)

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  return (
    <div>
      {
        codes !== null && codes.length !== 0
          ? <>
            <Typography align='right' variant='body2' sx={{ mr: 2, mt: 3 }}>
              共有 {codes.length} 張，目前是 {(page - 1) * LIMIT + 1} - {Math.min(page * LIMIT, codes.length)}
            </Typography>
            {
              codes
                .slice((page - 1) * LIMIT, page * LIMIT)
                .map(code => (
                  <CodeCard code={code} key={code.id} />
                ))
            }
            <div className='flex flex-row justify-center py-6'>
              <Stack spacing={2}>
                <Pagination count={~~(codes.length / LIMIT)}
                  color="primary"
                  onChange={handleChange}
                  renderItem={(item) => (
                    <PaginationItem
                      components={{ previous: ArrowBackIosIcon, next: ArrowForwardIosIcon }}
                      {...item}
                    />
                  )} />
              </Stack>
            </div>
          </>
          : (
            <div className='my-10'>
              <Typography component='p' variant='body1' align='center'>
                {noCardsString}</Typography>
            </div>
          )
      }
    </div>
  )
}

type TypeProps = {
  codes: ICode[],
  noCardsString?: string,
}
