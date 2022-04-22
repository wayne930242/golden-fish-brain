import { useState, useEffect } from 'react'
import ListItem from '@mui/material/ListItem'
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
            <div className='col-span-5 flex flex-col justify-center'>
              <DatePicker className='text-center cursor-pointer my-3 w-40' selected={startDate} onChange={handleOnPickDate} />
            </div>
            <div className='col-span-3 flex flex-row justify-center' style={{ lineHeight: '46px' }}>
              <Button onClick={handleOnClickPeeped} variant='text' color={tempPeeped ? 'primary' : 'secondary'} size='small'>
                {tempPeeped ? '有偷看' : '沒偷看'}
              </Button>
            </div>
            <div className='col-span-2 flex flex-col justify-center'>
              <IconButton onClick={(e) => { handleOnClickMood( 0) }} size='small' color={tempFamiliar === 0 ? 'error' : 'default'} >
                <MoodBadIcon />
              </IconButton>
              <IconButton onClick={(e) => { handleOnClickMood(1) }} size='small' color={tempFamiliar === 1 ? 'success' : 'default'} >
                <SentimentDissatisfiedIcon />
              </IconButton>
              <IconButton onClick={(e) => { handleOnClickMood(2) }} size='small' color={tempFamiliar === 2 ? 'primary' : 'default'} >
                <SentimentSatisfiedAltIcon />
              </IconButton>
            </div>
          </div>
        </ListItem>
    }
    </>
  )
}