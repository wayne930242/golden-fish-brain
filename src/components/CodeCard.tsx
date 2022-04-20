import { useState, useContext, useEffect } from 'react'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
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
import TextField from '@mui/material/TextField'

import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

import { Divider, Link } from '@mui/material'

import MoodBadIcon from '@mui/icons-material/MoodBad'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

import { getReviewTime } from '../helper/data'
import { patchCode, delCode } from '../actions/codesActions'
import { EditContent } from './EditContent'
import { GlobalContext } from '../App'
import { ICode } from "../interface"
import { ConfirmDialog } from './dialogs/ConfirmDislog'

export const CodeCard = ({ code }: { code: ICode }) => {
  const { dispatch } = useContext(GlobalContext)

  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false)
  const [openConfirmReview, setOpenConfirmReview] = useState<boolean>(false)

  const [expand, setExpend] = useState<boolean>(false)
  const handleOnClickTitle = () => {
    setExpend(ex => !ex)
  }

  const [editCode, setEditCode] = useState<ICode>(code)
  useEffect(() => {
    setEditCode(code)
  }, [code])

  const [editable, setEditable] = useState<boolean>(false)
  const [reviewing, setReviewing] = useState<boolean>(false)
  const [tempPeeped, setTempPeeped] = useState<boolean>(code.hasPeeped[code.hasPeeped.length - 1])
  const [tempFamiliar, setTempFamiliar] = useState<number>(code.familiar[code.familiar.length - 1])

  const [reviewCode, setReviewCode] = useState<ICode>(code)
  useEffect(() => {
    setReviewCode(code)
    setTempPeeped(code.hasPeeped[code.hasPeeped.length - 1])
    setTempFamiliar(code.familiar[code.familiar.length - 1])
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

    patchCode(dispatch.codes, {
      ...editCode,
      editTime: Date.now()
    })

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

  const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>, key: keyof ICode) => {
    e.stopPropagation()
    setReviewing(true)
    setReviewCode((c) => ({
      ...c,
      [key]: e.target.value,
    }))
  }

  const handleOnClickMood = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, n: number) => {
    e.stopPropagation()
    setReviewing(true)
    setTempFamiliar(n)
  }

  const handleOnPeep = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    setReviewing(true)
    setTempPeeped(e.target.checked)
  }

  const handleSubmitReview = async () => {
    const newReviewTime = [...code.reviewTime]
    newReviewTime.push(getReviewTime(code))
    const newHasPeeped = [...code.hasPeeped]
    newHasPeeped.push(tempPeeped === undefined ? false : tempPeeped)
    const newFamiliar = [...code.familiar]
    newFamiliar.push(tempFamiliar === undefined ? null : tempFamiliar)

    patchCode(dispatch.codes, {
      ...code,
      ...reviewCode,
      familiar: newFamiliar,
      hasPeeped: newHasPeeped,
      reviewTime: newReviewTime,
    })

    setReviewing(false)
    setReviewCode(code)
  }

  return (
    <div className='my-2'>
      <ConfirmDialog open={openConfirmDelete} setOpen={setOpenConfirmDelete} title="確認刪除嗎？" contentText='刪除後的資料將消失在世界上，確定嗎？'
        onClick={() => {
          delCode(dispatch.codes, code)
        }}
      />

      <ConfirmDialog open={openConfirmReview} setOpen={setOpenConfirmReview} title="確認送出嗎？" contentText='確認送出並更新這次的複習狀況嗎？'
        onClick={handleSubmitReview}
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
                  <Typography component="div" variant='h6'>{code.title}</Typography>
                  <div className='flex flex-row justify-end'>
                    {[0, 1, 2, 3, 4].map(n => (
                      <IconButton size='small' color='warning' key={n}>
                        {code.star <= n ? <StarOutlineIcon /> : <StarIcon />}
                      </IconButton>
                    ))}
                  </div>

                  <div className='my-2 flex-row flex justify-between'>
                    <Typography component="div" variant='caption'>{code.law}</Typography>
                  </div>

                </div>

                <div className='mt-2 mb-4'>
                  <Stack direction="row" spacing={1}>
                    {code.nums.map((ele: string) => (
                      <Chip label={ele} key={ele + Math.random()} />
                    ))}
                  </Stack>
                </div>
              </Paper>

              {!expand ? null : (<>

                <div className='my-4 overflow-x-hidden'>
                  <Link className='text-ellipsis text-xs' href={code.link} target='_blank'>{code.link}</Link>
                </div>
                <div className='my-2'>
                  <TextField sx={{ width: '100%' }} label="小叮嚀" size='small' variant="outlined" multiline onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleOnInput(e, 'note')} value={code.note} />
                </div>

                <Divider />
                <div className='my-2 flex flex-row justify-around'>
                  <IconButton onClick={(e) => { handleOnClickMood(e, 0) }} size='small' color={tempFamiliar === 0 ? 'error' : 'default'} >
                    <MoodBadIcon />
                  </IconButton>
                  <IconButton onClick={(e) => { handleOnClickMood(e, 1) }} size='small' color={tempFamiliar === 1 ? 'success' : 'default'} >
                    <SentimentDissatisfiedIcon />
                  </IconButton>
                  <IconButton onClick={(e) => { handleOnClickMood(e, 2) }} size='small' color={tempFamiliar === 2 ? 'primary' : 'default'} >
                    <SentimentSatisfiedAltIcon />
                  </IconButton>
                  <div className='ml-6 flex flex-row justify-center'>
                    <FormControlLabel control={<Checkbox onChange={handleOnPeep} checked={tempPeeped} />} label="有偷看" />
                  </div>
                </div>
              </>)}
            </>
          )}

        </CardContent>
        {!expand ? null : (
          <CardActions>
            <div className='w-full flex flex-row justify-between mx-4'>
              <div>
                <Button color='success' variant='contained'
                  onClick={() => setOpenConfirmReview(true)}
                >
                  送出複習
                </Button>
              </div>
              <div className='flex flex-row'>
                <div className='mr-2'>
                  <Button color='primary' variant='contained'
                    onClick={editable ? handleOnSubmit : handleOnEdit}
                  >
                    {editable ? '確定' : '編輯'}
                  </Button>
                </div>
                <div>
                  <Button color={editable ? 'warning' : 'error'} variant='contained'
                    onClick={editable ? handleOnCancel : handleOnDelete}
                  >
                    {editable ? '取消' : '刪除'}
                  </Button>
                </div>
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
