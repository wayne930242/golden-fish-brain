import { useState, useContext, useEffect } from 'react'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import StarIcon from '@mui/icons-material/Star'
import Button from '@mui/material/Button'

import { Divider, Link } from '@mui/material'

import MoodBadIcon from '@mui/icons-material/MoodBad'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

import { EditContent } from './EditContent'
import { GlobalContext } from '../App'
import { initialCode } from '../App'
import { ICode } from "../interface"

export const CodeCard = ({ code }: { code: ICode }) => {
  const { codes, dispatch, isFetching, setIsFetching } = useContext(GlobalContext)

  const [expand, setExpend] = useState<boolean>(false)
  const handleOnClickTitle = () => {
    setExpend(ex => !ex)
  }

  const [editCode, setEditCode] = useState<ICode>(code)
  const [editable, setEditable] = useState<boolean>(false)

  const handleOnEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setExpend(true)
    setEditable(true)
  }

  const handleOnSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setEditable(false)
  }

  const handleOnCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setEditable(false)
  }

  const handleOnDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
  }

  return (
    <Card key={code.id} sx={{ my: 2 }}>
      <div className={editable ? '' : 'cursor-pointer hover:bg-slate-50'} onClick={editable ? undefined : handleOnClickTitle}>
        <CardContent>
          {editable ? (
            <EditContent code={editCode} setCode={setEditCode} />
          ) : (
            <>
              <div>
                <div className='flex flex-row justify-between'>
                  <Typography component="div" variant='h6'>{code.title}</Typography>
                  <div className='flex flex-row'>
                    {[0, 1, 2, 3, 4].map(n => (
                      <IconButton size='small' color='warning' key={n} sx={{ cursor: 'default' }}>
                        {code.star <= n ? <StarOutlineIcon /> : <StarIcon />}
                      </IconButton>
                    ))}
                  </div>
                </div>

                <div className='my-2 flex-row flex justify-between'>
                  <Typography component="div" variant='caption'>{code.law}</Typography>
                </div>


              </div>

              <div className='mt-2 mb-4'>
                <Stack direction="row" spacing={1}>
                  {code.nums.map((ele: string) => (
                    <Chip label={ele} key={ele} />
                  ))}
                </Stack>
              </div>

              <Divider />

              {!expand ? null : (<>
                <div className='mt-2'>
                  <Typography sx={{ textOverflow: 'ellipsis' }} component="p" variant='body1'>小叮嚀：{code.note}</Typography>
                </div>
                {code.link ?
                  <div className='mt-2'>
                    連結：<Link href={code.link} target='_blank'>{code.link}</Link>
                  </div>
                  : null
                }

                <div className='my-2 flex flex-row justify-around'>
                  <IconButton size='small' color={code.familiar === 0 ? 'error' : 'default'} sx={{ cursor: 'default' }}>
                    <MoodBadIcon />
                  </IconButton>
                  <IconButton size='small' color={code.familiar === 1 ? 'success' : 'default'} sx={{ cursor: 'default' }}>
                    <SentimentDissatisfiedIcon />
                  </IconButton>
                  <IconButton size='small' color={code.familiar === 2 ? 'primary' : 'default'} sx={{ cursor: 'default' }}>
                    <SentimentSatisfiedAltIcon />
                  </IconButton>
                </div>
                <Typography component="div" variant='body1'>
                  {code.hasPeeped ? '有偷看！' : '沒偷看！'}
                </Typography>
              </>)}
            </>
          )}

        </CardContent>
        <CardActions>
          <div className='w-full flex flex-row justify-end'>
            <div className='mx-2'>
              <Button color='primary' variant='contained'
                onClick={editable ? handleOnSubmit : handleOnEdit}
              >
                {editable ? '確定' : '編輯'}
              </Button>
            </div>
            <div className='mx-2'>
              <Button color={editable ? 'warning' : 'error'} variant='contained'
                onClick={editable ? handleOnCancel : handleOnDelete}
              >
                {editable ? '取消' : '刪除'}
              </Button>
            </div>
          </div>
        </CardActions>
      </div>
    </Card>
  )
}

export default CodeCard
