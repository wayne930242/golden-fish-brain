import { useState } from 'react'

import {
  Typography,
  Stack,
  ListItem,
  List,
  Divider,
  Pagination,
  PaginationItem,
} from '@mui/material'

import MenuBookIcon from '@mui/icons-material/MenuBook'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import MoodBadIcon from '@mui/icons-material/MoodBad'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'

import { TypeHistory } from '../../helper/data'
import { ICode } from '../../interface';

export const History = ({
  history,
  onClickItem,
}: TypeProps) => {
  const LIMIT = 5

  const totalPage = Math.ceil(Object.keys(history).length / LIMIT)
  const [page, setPage] = useState<number>(1)

  const oldCodes: string[] = []

  const FamiliarIcon: { hasOld: React.ReactNode[], notHasOld: React.ReactNode[] } = {
    hasOld: [
      <MoodBadIcon sx={{ fill: '#C65D7B' }} />,
      <SentimentDissatisfiedIcon sx={{ fill: '#ebd2be' }} />,
      <SentimentSatisfiedAltIcon sx={{ fill: '#bad6bc' }} />,
    ],
    notHasOld: [
      <MoodBadIcon color='error' />,
      <SentimentDissatisfiedIcon color='warning' />,
      <SentimentSatisfiedAltIcon color='success' />,
    ],
  }

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  return (
    <div className='py-1'>
      <Typography align='right' variant='body2' sx={{ mr: 2, mt: 3 }}>
        共有 {totalPage} 頁，目前在第 {page} 頁
      </Typography>
      {
        Object.keys(history)
          .sort((t1, t2) => (
            history[t2].time - history[t1].time
          ))
          .slice((page - 1) * LIMIT, page * LIMIT)
          .map((time: string) => {
            return (
              <div key={time} className='pt-4'>
                <Typography component='div' variant='h6'>
                  {time}
                </Typography>
                <Divider />
                <List>
                  {history[time].codes.map((code) => {
                    let hasOld: boolean = false
                    if (oldCodes.includes(code.id)) {
                      hasOld = true
                    } else {
                      oldCodes.push(code.id)
                    }

                    return (
                      <ListItem
                        key={code.id}
                        button
                        onClick={() => onClickItem(code)}>
                        <div className='flex flex-row justify-between w-full'>
                          <Typography sx={{ mr: 1 }} color={hasOld ? 'GrayText' : 'black'} component='div'>【{code.law}】{code.nums.map(num => '#' + num).join(', ')}——{code.title}</Typography>
                          <div className='flex-shrink-0'>
                            {code.reviewTime.length === 0 ? null
                              : (
                                <>
                                  {[0, 1, 2].includes(code.familiar[code.familiar.length - 1]) ? FamiliarIcon[hasOld ? 'hasOld' : 'notHasOld'][code.familiar[code.familiar.length - 1]] : null}
                                  {code.hasPeeped[code.hasPeeped.length - 1] ? <MenuBookIcon sx={{ ml: 0.6 }} fontSize='small' color={hasOld ? 'secondary' : 'primary'} /> : null}
                                </>
                              )
                            }
                          </div>
                        </div>

                      </ListItem>
                    )
                  })}
                </List>
              </div>
            )
          })
      }
      <div className='flex flex-row justify-center pt-6'>
        <Stack spacing={2}>
          <Pagination count={totalPage}
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
    </div>
  )
}

type TypeProps = {
  history: TypeHistory,
  onClickItem: (code: ICode) => any,
}
