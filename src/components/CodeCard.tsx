import React, { useState, useContext, useEffect } from 'react'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import List from '@mui/material/List'
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

import { ReviewHistoryList } from './ReviewHistoryList'
import { getReviewString } from '../helper/data'
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
  const [tempPeeped, setTempPeeped] = useState<boolean>(code.hasPeeped.length !== 0 ? code.hasPeeped[code.hasPeeped.length - 1] : false)
  const [tempFamiliar, setTempFamiliar] = useState<number>(code.familiar.length !== 0 ? code.familiar[code.familiar.length - 1] : null)

  const [editedReview, setEditedReview] = useState<boolean>(false)

  const [reviewCode, setReviewCode] = useState<ICode>(code)
  useEffect(() => {
    setReviewCode(code)
    setTempPeeped(code.hasPeeped.length !== 0 ? code.hasPeeped[code.hasPeeped.length - 1] : false)
    setTempFamiliar(code.familiar.length !== 0 ? code.familiar[code.familiar.length - 1] : null)
  }, [code])

  const handleOnClearReview = () => {
    setTempPeeped(code.hasPeeped.length !== 0 ? code.hasPeeped[code.hasPeeped.length - 1] : false)
    setTempFamiliar(code.familiar.length !== 0 ? code.familiar[code.familiar.length - 1] : null)
    setEditedReview(false)
  }

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
    const newReviewTime = [...tempHistory.reviewTime]
    const newHasPeeped = [...tempHistory.hasPeeped]
    const newFamiliar = [...tempHistory.familiar]

    deletedHistories.forEach((ele, index) => {
      if (ele === true) {
        newReviewTime.splice(index, 1)
        newHasPeeped.splice(index, 1)
        newFamiliar.splice(index, 1)
      }
    })

    if (editCode.title.trim() === '') {
      setOpenAlert(true)
      return
    }

    patchCode(dispatch.codes, {
      ...editCode,
      editTime: Date.now(),
      familiar: newFamiliar,
      hasPeeped: newHasPeeped,
      reviewTime: newReviewTime,
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
    setReviewCode((c) => ({
      ...c,
      [key]: e.target.value,
    }))
  }

  const handleOnClickMood = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, n: number) => {
    e.stopPropagation()
    setTempFamiliar(n)
    setEditedReview(true)
  }

  const handleOnPeep = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    setTempPeeped(() => e.target.checked)
    setEditedReview(true)
  }

  const [tempHistory, setTempHistory] = useState<{
    reviewTime: number[],
    familiar: number[],
    hasPeeped: boolean[],
  }>({
    reviewTime: [...code.reviewTime],
    familiar: [...code.familiar],
    hasPeeped: [...code.hasPeeped],
  })
  const [deletedHistories, setDeletedHistories] = useState<boolean[]>([])

  useEffect(() => {
    setTempHistory({
      reviewTime: [...code.reviewTime],
      familiar: [...code.familiar],
      hasPeeped: [...code.hasPeeped],
    })
  }, [code])

  const handleOnDeleteHistory = (i: number) => {
    return (_e: React.MouseEvent<HTMLButtonElement>) => {
      setDeletedHistories((d => {
        const newDeleted = [...d]
        newDeleted[i] = true
        return newDeleted
      }))
    }
  }

  const handleOnUndoDeleteHistory = (i: number) => {
    return (_e: React.MouseEvent<HTMLButtonElement>) => {
      setDeletedHistories((d => {
        const newDeleted = [...d]
        newDeleted[i] = false
        return newDeleted
      }))
    }
  }

  const handleOnUpdateHistory = (i: number) => (
    familiar?: number,
    reviewTime?: number,
    hasPeeped?: boolean,
  ) => {
    const newFamiliar = [...reviewCode.familiar]
    const newReviewTime = [...reviewCode.reviewTime]
    const newHasPeeped = [...reviewCode.hasPeeped]
    if (familiar) newFamiliar[i] = familiar
    if (reviewTime) newReviewTime[i] = reviewTime
    if (hasPeeped) newHasPeeped[i] = hasPeeped
    setTempHistory({
      familiar: newFamiliar,
      reviewTime: newReviewTime,
      hasPeeped: newHasPeeped,
    })
  }

  const handleSubmitReview = async () => {
    const newReviewTime = [...code.reviewTime]
    const newHasPeeped = [...code.hasPeeped]
    const newFamiliar = [...code.familiar]

    newReviewTime.push(Date.now())
    newHasPeeped.push(tempPeeped === undefined ? false : tempPeeped)
    newFamiliar.push(tempFamiliar === undefined ? null : tempFamiliar)

    patchCode(dispatch.codes, {
      ...code,
      ...reviewCode,
      familiar: newFamiliar,
      hasPeeped: newHasPeeped,
      reviewTime: newReviewTime,
    })

    setDeletedHistories([])
    setEditedReview(false)
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

      <div className='hover:bg-slate-50 pb-3' >
        <CardContent>
          {editable ? (
            <>
              <EditContent code={editCode} setCode={setEditCode} />
              <Divider />
              <div className='my-2'>
                <List
                  sx={{ width: '100%', backgroundColor: 'inherit' }}
                  component="div"
                  aria-labelledby="nested-list-subheader"
                  subheader={
                    <Typography sx={{
                      ml: 2,
                    }} component="div" variant='h6' align='center'>
                      複習歷史
                    </Typography>
                  }
                >
                  {reviewCode.reviewTime.map((t, i) => (
                    <ReviewHistoryList
                      key={t}
                      reviewTime={t}
                      familiar={code.familiar[i]}
                      hasPeeped={code.hasPeeped[i]}
                      onDelete={handleOnDeleteHistory(i)}
                      onUnDoDelete={handleOnUndoDeleteHistory(i)}
                      onUpdate={handleOnUpdateHistory(i)}
                      deleted={Boolean(deletedHistories[i])}
                    />
                  ))
                  }
                </List>
              </div>
            </>
          ) : (
            <>
              <Paper
                sx={{
                  padding: 2,
                }}
                className={'cursor-pointer'} onClick={editable ? undefined : handleOnClickTitle}>
                <div>
                  <Typography component="div" variant='h6'>{code.title}</Typography>
                  <Typography component='div' variant='caption'>{getReviewString(code)}</Typography>
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
              {editedReview
                ? (
                  <>
                    <div className='mr-4'>
                      <Button color='success' variant='contained'
                        onClick={() => setOpenConfirmReview(true)}
                      >
                        新增複習
                      </Button>
                    </div>
                    <div>
                      <Button color={editable ? 'warning' : 'error'} variant='contained'
                        onClick={handleOnClearReview}
                      >
                        取消
                      </Button>
                    </div>
                  </>
                )
                : (

                  <>
                    <div className='mr-4'>
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
                  </>
                )
              }
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
