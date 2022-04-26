import React, { useState } from 'react'

import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import StarIcon from '@mui/icons-material/Star'
import Typography from '@mui/material/Typography'
import Autocomplete from '@mui/material/Autocomplete'
import { Divider } from '@mui/material'

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { LAWS } from '../data/laws'
import { ICode } from '../interface'

export const EditContent = ({
  setCode,
  code,
}: {
  code: ICode,
  setCode: React.Dispatch<React.SetStateAction<ICode>>,
}) => {
  const [startDate, setStartDate] = useState<Date>(new Date(code.createTime))

  const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>, key: keyof ICode) => {
    setCode((c) => ({
      ...c,
      [key]: e.target.value,
    }))
  }

  const [tempNums, setTempNums] = useState<string>('')
  const handleOnChangeChip = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(/,$/)) {
      if (!code.nums.includes(tempNums)) {
        setCode((c) => {
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
    setCode(c => ({
      ...c,
      star: n,
    }))
  }

  const handleOnChangeLaw = (_: any, value: string) => {
    setCode(c => ({
      ...c,
      law: value,
    }))
  }


  return (
    <div className='flex flex-col'>
      <div className='mb-1 flex flex-row justify-between'>
        <TextField sx={{ width: '100%' }} label="標題" size='small' value={code.title}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleOnInput(e, 'title')} required />
        <div className='flex flex-row'>
          {[0, 1, 2, 3, 4].map(n => (
            <IconButton onClick={() => { handleOnClickStar(n + 1) }} size='small' color='warning' key={n}>
              {code.star <= n ? <StarOutlineIcon /> : <StarIcon />}
            </IconButton>
          ))}
        </div>
      </div>

      <div className='my-2 flex-row flex justify-between'>
        <Autocomplete
          disablePortal
          options={LAWS}
          getOptionLabel={(option) => option}
          onChange={handleOnChangeLaw}
          value={code.law}
          sx={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} label="法律" size='small' />}
        />

        <div>
          <TextField sx={{ width: '100%', ml: 2 }} label="法條編號" size='small' variant="outlined"
            onChange={handleOnChangeChip} value={tempNums}
            onBlur={(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              if (e.target.value.trim()) {
                setCode((c) => {
                  const newNums = [...c.nums]
                  newNums.push(e.target.value)
                  return ({
                    ...c,
                    nums: newNums,
                  })
                })
              }
              setTempNums(() => '')
            }}
          />
          <Typography component='p' variant="caption" align='right'>
            輸入 , 來分隔
          </Typography>
        </div>

      </div>

      <div className='mb-2 flex flex-row justify-between'>
        <Typography component="div" variant='body1'>法條編號：</Typography>
        <Stack direction="row" spacing={1} justifyContent='flex-end'>
          {code.nums.map((ele: string) => (
            <Chip label={ele} key={ele} onDelete={() => {
              setCode((c) => {
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

      <div className='my-2'>
        <TextField sx={{ width: '100%' }} label="小叮嚀" size='small' variant="outlined" multiline onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleOnInput(e, 'note')} value={code.note} />
      </div>
      <div className='my-2'>
        <TextField sx={{ width: '100%' }} label="連結" size='small' variant="outlined" onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleOnInput(e, 'link')} value={code.link} />
      </div>
    </div>
  )
}
