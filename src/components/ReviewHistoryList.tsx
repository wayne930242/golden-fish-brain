import ListItem from '@mui/material/ListItem'
import { IconButton } from '@mui/material'

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
  onUpdate: (history: {
    familiar: number,
    reviewTime: number,
    hasPeeped: boolean,
  }) => any,
  deleted: boolean,
}) => {
  return (
    <>{
      deleted ?
        <ListItem sx={{ width: '100%' }}>
          <div className='grid grid-cols-12 gap-2 w-full'>
            <div className='col-span-2 flex flex-col justify-center'>
              <IconButton sx={{ my: 'auto', display: 'block' }} size='small' onClick={onUnDoDelete}>
                <UndoIcon />
              </IconButton>
            </div>
            <div className='col-span-6 text-gray-400' style={{lineHeight: '46px'}}>
              {timeParser(reviewTime)}
            </div>
            <div className='col-span-3 text-gray-400' style={{lineHeight: '46px'}}>
              {hasPeeped ? '有偷看' : '沒偷看'}
            </div>
            <div className='col-span-1 flex flex-col justify-center'>
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
          <div className='grid grid-cols-12 gap-2 w-full'>
            <div className='col-span-2 flex flex-col justify-center'>
              <IconButton sx={{ my: 'auto', display: 'block' }} size='small' onClick={onDelete}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className='col-span-6' style={{lineHeight: '46px'}}>
              {timeParser(reviewTime)}
            </div>
            <div className='col-span-3' style={{lineHeight: '46px'}}>
              {hasPeeped ? '有偷看' : '沒偷看'}
            </div>
            <div className='col-span-1 leading-9 flex flex-col justify-center'>
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