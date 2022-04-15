import React, { useState, useContext } from 'react'

import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import StarIcon from '@mui/icons-material/Star'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'

import MoodBadIcon from '@mui/icons-material/MoodBad'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

import { fetchCodes, putCode } from '../../api/codesApi'
import { LAWS } from '../../data/laws'
import { ICode } from '../../interface'
import { initialCode, GlobalContext } from '../../App'

export const AddTaskDialog = ({
  open,
  setOpen,
  newCode,
  setNewCode,
}: {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  newCode: ICode,
  setNewCode: React.Dispatch<React.SetStateAction<ICode>>,
}) => {
  const { codes, dispatch, isFetching, setIsFetching } = useContext(GlobalContext)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>, key: keyof ICode) => {
    setNewCode((c) => ({
      ...c,
      [key]: e.target.value,
    }))
  }

  const [tempNums, setTempNums] = useState<string>('')
  const handleOnChangeChip = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(/,$/)) {
      if (!newCode.nums.includes(tempNums)) {
        setNewCode((c) => {
          const newNums = [...c.nums]
          newNums.push(tempNums)
          return ({
            ...c,
            nums: newNums,
          })
        })
      }
      setTempNums(() => '')
    } else {
      setTempNums(() => e.target.value)
    }
  }

  const handleOnClickStar = (n: number) => {
    setNewCode(c => ({
      ...c,
      star: n,
    }))
  }

  const handleOnClickMood = (n: number) => {
    setNewCode(c => ({
      ...c,
      familiar: n,
    }))
  }

  const handleOnPeep = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCode(c => ({
      ...c,
      hasPeeped: event.target.checked,
    }))
  }

  const handleOnChangeLaw = (_: any, value: string) => {
    setNewCode(c => ({
      ...c,
      law: value,
    }))
  }

  const handleOnSubmit = () => {
    (async () => {
      setIsFetching(true)
      putCode(newCode)
        .then(async () => {
          const data = await fetchCodes()
          dispatch({ type: 'fetchCodes', payload: data })
        })
        .finally(() => {
          setNewCode(initialCode)
          setOpen(false)
        })
      setIsFetching(false)
    })()
  }

  const handleOnCancel = () => {
    setNewCode(initialCode)
    setOpen(false)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <div className='flex flex-row justify-between'>
        <DialogTitle>新進度</DialogTitle>
        <div className='mr-4 flex flex-row'>
          {[0, 1, 2, 3, 4].map(n => (
            <IconButton onClick={() => { handleOnClickStar(n + 1) }} size='small' color='warning' key={n}>
              {newCode.star <= n ? <StarOutlineIcon /> : <StarIcon />}
            </IconButton>
          ))}
        </div>
      </div>
      <DialogContent>
        <div className='flex flex-col'>
          <div className='mb-1'>
            <TextField sx={{ width: '100%' }} label="標題" size='medium' variant="standard" value={newCode.title}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleOnInput(e, 'title')} />
          </div>
          <div className='my-1'>
            <Autocomplete
              disablePortal
              options={LAWS}
              getOptionLabel={(option) => option}
              onChange={handleOnChangeLaw}
              value={newCode.law}
              sx={{ width: '100%' }}
              renderInput={(params) => <TextField {...params} label="法律" size='small' />}
            />
          </div>
          <div className='my-2'>
            <TextField sx={{ width: '100%' }} label="法條編號" size='small' variant="outlined"
              onChange={handleOnChangeChip} value={tempNums}
              onBlur={(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setNewCode((c) => {
                  const newNums = [...c.nums]
                  newNums.push(e.target.value)
                  return ({
                    ...c,
                    nums: newNums,
                  })
                })
                setTempNums(() => '')
              }}
            />
            <Typography component='p' variant="caption" align='right'>
              輸入 , 來分隔
            </Typography>
            <div className='my-2'>
              <Stack direction="row" spacing={1}>
                {newCode.nums.map((ele: string) => (
                  <Chip label={ele} key={ele} onDelete={() => {
                    setNewCode((c) => {
                      const newNums = [...c.nums]
                      newNums.splice(c.nums.indexOf(ele), 1)
                      return ({
                        ...c,
                        nums: newNums,
                      })
                    })
                  }} />
                ))}
              </Stack>
            </div>
          </div>
          <div className='my-2'>
            <TextField sx={{ width: '100%' }} label="給自己的叮嚀" size='small' variant="outlined" multiline onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleOnInput(e, 'note')} />
          </div>
          <div className='my-2'>
            <TextField sx={{ width: '100%' }} label="連結" size='small' variant="outlined" onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleOnInput(e, 'link')} />
          </div>
          <Divider />
          <div className='my-2 flex flex-row justify-around'>
            <IconButton onClick={() => { handleOnClickMood(0) }} size='small' color={newCode.familiar === 0 ? 'error' : 'default'} >
              <MoodBadIcon />
            </IconButton>
            <IconButton onClick={() => { handleOnClickMood(1) }} size='small' color={newCode.familiar === 1 ? 'success' : 'default'} >
              <SentimentDissatisfiedIcon />
            </IconButton>
            <IconButton onClick={() => { handleOnClickMood(2) }} size='small' color={newCode.familiar === 2 ? 'primary' : 'default'} >
              <SentimentSatisfiedAltIcon />
            </IconButton>
          </div>
          <div className='my-2 flex flex-row justify-center'>
            <FormControlLabel control={<Checkbox onChange={handleOnPeep} checked={newCode.hasPeeped} />} label="有偷看" />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='error' onClick={handleOnCancel}>
          取消
        </Button>
        <Button variant='contained' color='primary' onClick={handleOnSubmit}>
          新增
        </Button>
      </DialogActions>

    </Dialog >
  )
}

export default AddTaskDialog
