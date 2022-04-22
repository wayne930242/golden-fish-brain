import { useState } from 'react'
import ListItem from '@mui/material/ListItem'
import { IconButton } from '@mui/material'
import DatePicker from 'react-datepicker'

import UndoIcon from '@mui/icons-material/Undo'
import CloseIcon from '@mui/icons-material/Close'

import { timeParser } from '../helper/view'

import MoodBadIcon from '@mui/icons-material/MoodBad'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

export const ReviewHistoryList = ({
  reviewTime,
  familiar,
  hasPeeped,
  onDelete,
  onUnDoDelete,
  onUpdate,
  deleted,
}: {
  familiar: number,
  reviewTime: number,
  hasPeeped: boolean,
  onUnDoDelete: (e?: React.MouseEvent<HTMLButtonElement>) => any,
  onDelete: (e?: React.MouseEvent<HTMLButtonElement>) => any,
  onUpdate: (familiar?: number, reviewTime?: number, hasPeeped?: boolean) => any,
  deleted: boolean,
}) => {
  const [startDate, setStartDate] = useState<Date>(new Date(reviewTime))

  const handleOnPickDate = (data: Date) => {
    setStartDate(() => data)
    onUpdate(undefined, data.getTime(), undefined)
  }

  return (
    <>{
      deleted ?
        <ListItem sx={{ width: '100%' }}>
          <div className='grid grid-cols-12 gap-1 w-full'>
            <div className='col-span-2 flex flex-col justify-center'>
              <IconButton sx={{ my: 'auto', display: 'block' }} size='small' onClick={onUnDoDelete}>
                <UndoIcon />
              </IconButton>
            </div>
            <div className='col-span-5 text-gray-400 text-center' style={{ lineHeight: '46px' }}>
              {timeParser(reviewTime)}
            </div>
            <div className='col-span-3 text-gray-400 text-center' style={{ lineHeight: '46px' }}>
              {hasPeeped ? '有偷看' : '沒偷看'}
            </div>
            <div className='col-span-2 flex flex-col justify-center'>
              {familiar === 0
                ? (
                  <IconButton sx={{ my: 'auto', display: 'block' }} size='small' color='error'>
                    <MoodBadIcon />
                  </IconButton>
                )
                : (
                  <IconButton sx={{ my: 'auto', display: 'block' }} size='small' color='success'>
                    <SentimentDissatisfiedIcon />
                  </IconButton>
                )
                  ? familiar === 1
                  : (
                    <IconButton sx={{ my: 'auto', display: 'block' }} size='small' color='primary'>
                      <SentimentSatisfiedAltIcon />
                    </IconButton>
                  )
              }
            </div>
          </div>
        </ListItem>
        :
        <ListItem sx={{ width: '100%' }}>
          <div className='grid grid-cols-12 gap-1 w-full'>
            <div className='col-span-2 flex flex-col justify-center'>
              <IconButton sx={{ my: 'auto', display: 'block' }} size='small' onClick={onDelete}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className='col-span-5'>
              <DatePicker className='text-center cursor-pointer my-3' selected={startDate} onChange={handleOnPickDate} />
            </div>
            <div className='col-span-3 text-center' style={{ lineHeight: '46px' }}>
              {hasPeeped ? '有偷看' : '沒偷看'}
            </div>
            <div className='col-span-2 leading-9 flex flex-col justify-center'>
              {familiar === 0
                ? (
                  <IconButton sx={{ my: 'auto', display: 'block' }} size='small' color='error'>
                    <MoodBadIcon />
                  </IconButton>
                )
                : (
                  <IconButton sx={{ my: 'auto', display: 'block' }} size='small' color='success'>
                    <SentimentDissatisfiedIcon />
                  </IconButton>
                )
                  ? familiar === 1
                  : (
                    <IconButton sx={{ my: 'auto', display: 'block' }} size='small' color='primary'>
                      <SentimentSatisfiedAltIcon />
                    </IconButton>
                  )
              }
            </div>
          </div>
        </ListItem>
    }
    </>
  )
}