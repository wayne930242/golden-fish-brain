import React, { useState, useContext, useEffect } from 'react'
import cx from 'classnames'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import StarIcon from '@mui/icons-material/Star'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Paper from '@mui/material/Paper'
import CheckIcon from '@mui/icons-material/Check'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'

import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import MenuBookIcon from '@mui/icons-material/MenuBook'

import { Divider, Link } from '@mui/material'

import MoodBadIcon from '@mui/icons-material/MoodBad'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

import { timeParser } from '../helper/view'
import { ReviewHistoryList } from './ReviewHistoryList'
import { getReviewString } from '../helper/data'
import { patchCode, delCode } from '../actions/codesActions'
import { EditContent } from './EditContent'
import { GlobalContext } from '../App'
import { ICode } from "../interface"
import { ConfirmDialog } from './dialogs/ConfirmDislog'

const FamiliarIcon: React.ReactNode[] = [
  <MoodBadIcon color='error' />,
  <SentimentDissatisfiedIcon color='warning' />,
  <SentimentSatisfiedAltIcon color='success' />,
]

export const CodeCard = ({ code }: { code: ICode }) => {
  const { dispatch } = useContext(GlobalContext)

  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false)
  const [openConfirmReview, setOpenConfirmReview] = useState<boolean>(false)

  const [openHistory, setOpenHistory] = useState<boolean>(false)

  const [expand, setExpand] = useState<boolean>(false)
  const handleOnClickTitle = () => {
    setExpand(ex => !ex)
    setOpenHistory(false)
  }

  const [editCode, setEditCode] = useState<ICode>(code)
  useEffect(() => {
    setEditCode(code)
  }, [code])

  const [editable, setEditable] = useState<boolean>(false)
  const [tempPeeped, setTempPeeped] = useState<boolean>(code.hasPeeped.length !== 0 ? code.hasPeeped[code.hasPeeped.length - 1] : false)
  const [tempFamiliar, setTempFamiliar] = useState<number>(code.familiar.length !== 0 ? code.familiar[code.familiar.length - 1] : null)

  const [reviewCode, setReviewCode] = useState<ICode>(code)
  useEffect(() => {
    setReviewCode(code)
    setTempPeeped(code.hasPeeped.length !== 0 ? code.hasPeeped[code.hasPeeped.length - 1] : false)
    setTempFamiliar(code.familiar.length !== 0 ? code.familiar[code.familiar.length - 1] : null)
  }, [code])

  const [openAlert, setOpenAlert] = useState<boolean>(false)

  const handleOnEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setExpand(true)
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
    setExpand(true)
  }

  const handleOnCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setEditable(false)
    setOpenConfirmDelete(false)
  }

  const handleOnClose = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    e.stopPropagation()
    setEditable(false)
    setOpenHistory(false)
    setExpand(false)
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
  }

  const handleOnPeep = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    setTempPeeped(() => e.target.checked)
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
  }

  return (
    <div>
      <ConfirmDialog open={openConfirmDelete} setOpen={setOpenConfirmDelete} title="確認刪除嗎？" contentText='刪除後的資料將消失在世界上，確定嗎？'
        onClick={() => {
          delCode(dispatch.codes, code)
        }}
      />

      <ConfirmDialog open={openConfirmReview} setOpen={setOpenConfirmReview} title="確認送出嗎？" contentText='確認送出並更新這次的複習狀況嗎？'
        onClick={handleSubmitReview}
      />

      <div className='hover:bg-slate-50 border-b-2' >
        <CardContent>
          {editable ? (
            <>
              <EditContent code={editCode} setCode={setEditCode} />
              <Divider />
              <div className='my-2'>
                <Typography sx={{
                  ml: 2,
                }} component="div" variant='h6' align='center'>
                  編輯歷史
                </Typography>

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
              </div>

              <div className='flex flex-row justify-between'>
                <div className='flex flex-row'>
                  <div className='mr-4'>
                    <Button color='primary' variant='contained'
                      onClick={handleOnSubmit}
                    >
                      確定
                    </Button>
                  </div>

                  <div className='mr-4'>
                    <Button color='warning' variant='contained'
                      onClick={handleOnCancel}
                    >
                      取消
                    </Button>
                  </div>
                </div>

                <div>
                  <Button color='error' variant='contained'
                    onClick={handleOnDelete}
                  >
                    刪除
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Paper
                sx={{
                  padding: 2,
                }}
                className={'cursor-pointer'} onClick={editable ? undefined : handleOnClickTitle}>
                <div className='flex flex-row justify-between'>
                  <div className='flex flex-row'>
                    {[0, 1, 2, 3, 4].map(n => (
                      <IconButton size='small' color='warning' key={n}>
                        {code.star <= n ? <StarOutlineIcon /> : <StarIcon />}
                      </IconButton>
                    ))}
                  </div>

                  <div>
                    {code.reviewTime.length === 0 ? null
                      : (<>
                        {[0, 1, 2].includes(code.familiar[code.familiar.length - 1]) ? FamiliarIcon[code.familiar[code.familiar.length - 1]] : null}
                        {code.hasPeeped[code.hasPeeped.length - 1] ? <MenuBookIcon sx={{ ml: 1 }} fontSize='small' color='primary' /> : null}
                      </>)
                    }
                  </div>
                </div>
                <div className='my-2 flex-row flex'>
                  <Typography component="div" variant='body1'>【{code.law}】</Typography>
                  <Typography component="div" variant='body1'>{code.nums.map((ele: string, index) => (
                    <span key={ele + Math.random()}>{index === 0 ? null : ", "}#{ele}</span>
                  ))}
                  </Typography>
                </div>

                <div className='ml-2'>
                  <Typography component="div" variant='h6'>{code.title}</Typography>
                  <Typography component='div' variant='caption' color='GrayText'>{getReviewString(code)}</Typography>
                </div>
              </Paper>

              {!expand ? null : (
                <div>
                  <div className='py-2 w-full px-2 flex flex-row justify-between'>
                    <div className='flex flex-row justify-start'>
                      <IconButton onClick={(e) => { handleOnClickMood(e, 0) }} size='small' color={tempFamiliar === 0 ? 'error' : 'default'} >
                        <MoodBadIcon />
                      </IconButton>
                      <IconButton onClick={(e) => { handleOnClickMood(e, 1) }} size='small' color={tempFamiliar === 1 ? 'warning' : 'default'} >
                        <SentimentDissatisfiedIcon />
                      </IconButton>
                      <IconButton onClick={(e) => { handleOnClickMood(e, 2) }} size='small' color={tempFamiliar === 2 ? 'success' : 'default'} >
                        <SentimentSatisfiedAltIcon />
                      </IconButton>
                    </div>
                    <div className='flex flex-row justify-center'>
                      <FormControlLabel control={<Checkbox onChange={handleOnPeep} checked={tempPeeped} />} label={<><MenuBookIcon sx={{ mr: 1, fontSize: '1.45rem' }} color='primary' /><span>偷看</span></>} />
                    </div>
                    <div>
                      <Button color='success' variant='contained'
                        onClick={() => setOpenConfirmReview(true)}
                        startIcon={<CheckIcon />}
                      >
                        送出
                      </Button>
                    </div>
                  </div>

                  <div className='my-2 overflow-x-hidden'>
                    <Link className='text-ellipsis text-xs' href={code.link} target='_blank'>{code.link}</Link>
                  </div>

                  <div
                    className={cx(
                      'cursor-pointer w-full shadow-md rounded-2l py-0.5 text-center mb-6',
                      'bg-white hover:bg-zinc-100',
                    )}
                    onClick={() => { setOpenHistory(h => !h) }}
                  >
                    <TipsAndUpdatesIcon sx={{ my: 1 }} fontSize='medium' color='warning' />
                    {openHistory
                      ? <>
                        {code.note && code.note.trim() !== ''
                          ? (
                            <div className='my-2 mx-4 flex flex-row justify-center'>
                              <Typography component='div' variant='body1'> {code.note} </Typography>
                            </div>
                          ) : null
                        }

                        {reviewCode.reviewTime.length !== 0
                          ? (
                            <List
                              sx={{ width: '100%', backgroundColor: 'inherit' }}
                              component="div"
                              aria-labelledby="nested-list-subheader"
                            >
                              {reviewCode.reviewTime.map((t, i) => {
                                return (
                                  <ListItem sx={{ width: '100%' }} key={String(t) + String(i)}>
                                    <div className='grid grid-cols-12 gap-1 w-full'>
                                      <div className='col-span-1 text-center' style={{ lineHeight: '46px' }}>
                                        {i + 1}.
                                      </div>
                                      <div className='col-span-5' style={{ lineHeight: '46px' }}>
                                        {timeParser(t)}
                                      </div>
                                      <div className='col-span-4 text-right' style={{ lineHeight: '46px' }}>
                                        {code.hasPeeped[i] ? <MenuBookIcon sx={{ mr: 1 }} fontSize='small' color='primary' /> : null}
                                        {code.hasPeeped[i] ? '偷看！' : '沒偷看'}
                                      </div>
                                      <div className='col-span-2 flex flex-col justify-center'>
                                        {[0, 1, 2].includes(code.familiar[i])
                                          ? FamiliarIcon[code.familiar[i]] === 0
                                          : null}
                                      </div>
                                    </div>
                                  </ListItem>
                                )
                              })
                              }
                            </List>
                          )
                          : null}
                      </>
                      : null}
                  </div>

                  <div className='w-full flex flex-row justify-between'>
                    <div>
                      <Button color='primary' variant='contained'
                        onClick={handleOnEdit}
                      >
                        編輯
                      </Button>
                    </div>

                    <div>
                      <Button color='secondary' variant='contained'
                        onClick={handleOnClose}
                      >
                        關閉
                      </Button>
                    </div>
                  </div>

                </div>
              )}
            </>
          )}

        </CardContent>

      </div>

      <Snackbar sx={{ width: '90%' }} open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
          忘了寫標題囉。
        </Alert>
      </Snackbar>
    </div >
  )
}

export default CodeCard
