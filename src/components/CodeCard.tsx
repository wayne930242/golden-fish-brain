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
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Paper from '@mui/material/Paper'

import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

import { Divider, Link } from '@mui/material'

import MoodBadIcon from '@mui/icons-material/MoodBad'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

import { patchCode, fetchCodes, delCode } from '../api/codesApi'
import { EditContent } from './EditContent'
import { GlobalContext } from '../App'
import { ICode } from "../interface"
import { ConfirmDialog } from './dialogs/ConfirmDislog'

export const CodeCard = ({ code }: { code: ICode }) => {
  const { dispatch, isFetching, setIsFetching } = useContext(GlobalContext)
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false)

  const [expand, setExpend] = useState<boolean>(false)
  const handleOnClickTitle = () => {
    setExpend(ex => !ex)
  }

  const [editCode, setEditCode] = useState<ICode>(code)
  useEffect(() => {
    setEditCode(code)
  }, [code])

  const [editable, setEditable] = useState<boolean>(false)

  const [reviewCode, setReviewCode] = useState<ICode>(code)
  useEffect(() => {
    setReviewCode(code)
  }, [code])

  const [openAlert, setOpenAlert] = useState<boolean>(false)

  const handleOnEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setExpend(true)
    setEditable(true)
  }

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  const handleOnSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (editCode.title.trim() === '') {
      setOpenAlert(true)
      return
    }

    (async () => {
      setIsFetching(true)
      patchCode({
        ...editCode,
        editTime: Date.now()
      })
        .then(async () => {
          const data = await fetchCodes()
          dispatch({ type: 'fetchCodes', payload: data })
        })
      setIsFetching(false)
    })()

    setEditable(false)
    setExpend(true)
  }

  const handleOnCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setEditable(false)
    setOpenConfirmDelete(false)
  }

  const handleOnDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setOpenConfirmDelete(true)
  }

  const handleOnClickMood = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, n: number) => {
    e.stopPropagation()
    setReviewCode(c => {
      const newFamiliar = [...c.familiar]
      newFamiliar.push(n)
      return ({
        ...c,
        familiar: newFamiliar,
      })
    })
  }

  const handleOnPeep = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    setReviewCode(c => {
      const newHasPeeped = [...c.hasPeeped]
      newHasPeeped.push(e.target.checked)
      return ({
        ...c,
        hasPeeped: newHasPeeped,
      })
    })
  }

  return (
    <div className='my-2'>
      <ConfirmDialog open={openConfirmDelete} setOpen={setOpenConfirmDelete} title="確認刪除嗎？" contentText='刪除後的資料將消失在世界上，確定嗎？'
        onClick={() => {
          (async () => {
            setIsFetching(true)
            delCode(code)
              .then(async () => {
                const data = await fetchCodes()
                dispatch({ type: 'fetchCodes', payload: data })
              })
            setIsFetching(false)
          })()
        }}
      />

      <div className={'hover:bg-slate-50'} >
        <CardContent>
          {editable ? (
            <EditContent code={editCode} setCode={setEditCode} />
          ) : (
            <>
              <Paper
                sx={{
                  padding: 2,
                }}
                className={'cursor-pointer'} onClick={editable ? undefined : handleOnClickTitle}>
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
              </Paper>

              {!expand ? null : (<>
                {code.note.trim() ?
                  <div className='my-3'>
                    <Typography sx={{ textOverflow: 'ellipsis' }} component="p" variant='body1'>小叮嚀：{code.note}</Typography>
                  </div>
                  : null}
                {code.link ?
                  <div className='mt-2'>
                    連結：<Link href={code.link} target='_blank'>{code.link}</Link>
                  </div>
                  : null
                }

                <Divider />
                <div className='my-2 flex flex-row justify-around'>
                  <IconButton onClick={(e) => { handleOnClickMood(e, 0) }} size='small' color={reviewCode.familiar[reviewCode.familiar.length - 1] === 0 ? 'error' : 'default'} >
                    <MoodBadIcon />
                  </IconButton>
                  <IconButton onClick={(e) => { handleOnClickMood(e, 1) }} size='small' color={reviewCode.familiar[reviewCode.familiar.length - 1] === 1 ? 'success' : 'default'} >
                    <SentimentDissatisfiedIcon />
                  </IconButton>
                  <IconButton onClick={(e) => { handleOnClickMood(e, 2) }} size='small' color={reviewCode.familiar[reviewCode.familiar.length - 1] === 2 ? 'primary' : 'default'} >
                    <SentimentSatisfiedAltIcon />
                  </IconButton>
                  <div className='ml-6 flex flex-row justify-center'>
                    <FormControlLabel control={<Checkbox onChange={handleOnPeep} checked={reviewCode.hasPeeped[reviewCode.hasPeeped.length - 1]} />} label="有偷看" />
                  </div>
                </div>
              </>)}
            </>
          )}

        </CardContent>
        {!expand ? null : (
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
        )}
      </div>

      <Snackbar sx={{ width: '90%' }} open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
          忘了寫標題囉。
        </Alert>
      </Snackbar>
    </div>
  )
}

export default CodeCard
