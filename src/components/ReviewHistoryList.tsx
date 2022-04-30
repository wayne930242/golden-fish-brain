import { useState, useEffect } from 'react'
import { IconButton, Button } from '@mui/material'
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

  const [tempPeeped, setTempPeeped] = useState<boolean>(hasPeeped)
  useEffect(() => {
    setTempPeeped(hasPeeped)
  }, [hasPeeped])

  const [tempFamiliar, setTempFamiliar] = useState<number>(familiar)
  useEffect(() => {
    setTempFamiliar(familiar)
  }, [familiar])

  const handleOnPickDate = (data: Date) => {
    setStartDate(() => data)
    onUpdate(undefined, data.getTime(), undefined)
  }

  const handleOnClickPeeped = () => {
    setTempPeeped(p => !p)
    onUpdate(undefined, undefined, !hasPeeped)
  }

  const handleOnClickMood = (n: number) => {
    setTempFamiliar(n)
    onUpdate(n, undefined, undefined)
  }

  return (
    <div className='flex flex-col'>{
      deleted ?
        <div>
          <div className='grid grid-cols-12 gap-1 w-full'>
            <div className='col-span-5 text-gray-400 text-center' style={{ lineHeight: '46px' }}>
              {timeParser(reviewTime)}
            </div>
            <div className='col-span-3 text-gray-400 text-center' style={{ lineHeight: '46px' }}>
              {hasPeeped ? '偷看！' : '沒偷看'}
            </div>
            <div className='col-span-2 flex flex-col justify-center'>
              {familiar === 0
                ? (
                  <MoodBadIcon color='error' />
                )
                : familiar === 1
                  ? (
                    <SentimentDissatisfiedIcon color='warning' />
                  )
                  : (
                    <SentimentSatisfiedAltIcon color='success' />
                  )
              }
            </div>
            <div className='col-span-2 flex flex-col justify-center'>
              <IconButton sx={{ my: 'auto', display: 'block' }} size='small' onClick={onUnDoDelete}>
                <UndoIcon />
              </IconButton>
            </div>
          </div>
        </div>
        :
        <div className='my-2 bg-white rounded-lg px-6 py-4'>
          <div className='w-full'>
            <div className='flex flex-row justify-between'>
              <div className='flex flex-col justify-center'>
                <DatePicker className='bg-blue-600 hover:bg-blue-900 text-white text-center cursor-pointer my-3 py-1 rounded-md w-28' selected={startDate} onChange={handleOnPickDate} />
              </div>

              <div className='flex flex-row justify-center py-3' style={{ lineHeight: '46px' }}>
                <Button onClick={handleOnClickPeeped} variant='outlined' color={tempPeeped ? 'warning' : 'success'} size='small'>
                  {tempPeeped ? '偷看！' : '沒偷看'}
                </Button>
              </div>
            </div>
            <div className='flex flex-row justify-between'>
              <div className='flex flex-row justify-center'>
                <IconButton onClick={(e) => { handleOnClickMood(0) }} size='small' color={tempFamiliar === 0 ? 'error' : 'default'} >
                  <MoodBadIcon />
                </IconButton>
                <IconButton onClick={(e) => { handleOnClickMood(1) }} size='small' color={tempFamiliar === 1 ? 'warning' : 'default'} >
                  <SentimentDissatisfiedIcon />
                </IconButton>
                <IconButton onClick={(e) => { handleOnClickMood(2) }} size='small' color={tempFamiliar === 2 ? 'success' : 'default'} >
                  <SentimentSatisfiedAltIcon />
                </IconButton>
              </div>
              <div className='flex flex-col justify-center'>
                <Button size='small' onClick={onDelete} startIcon={<CloseIcon />} variant='contained' color='error' >
                  刪除歷史
                </Button>
              </div>
            </div>
          </div>
        </div>
    }
    </div>
  )
}