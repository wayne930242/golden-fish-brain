import { useEffect, useState, useContext } from 'react'
import {
  Divider,
  Stack,
  TextField,
  Typography,
  Button,
} from '@mui/material'

import { GlobalContext } from '../App'
import { Loading } from '../components/Loading'
import { LuckyCodes } from '../helper/data'
import CodeCard from '../components/CodeCard'
import { ICode } from '../interface'

const startTime: TypeStartTime = {
  today: 1000 * 60 * 60 * 24,
  all: Infinity,
}

const startTimeText: TypeStartTimeText = {
  today: '今天',
  all: '全部',
}

type TypeStartTimeText = {
  today: string,
  all: string,
}

type TypeStartTime = {
  today: number,
  all: number,
}

const filterResult = (filter: keyof TypeStartTimeText, codeTime: number) => {
  return codeTime >= Date.now() - startTime[filter]
}

export const Home = () => {
  const [mode, setMode] = useState<'review' | 'achive'>('achive')
  const [reviewCards, setReviewCards] = useState<ICode[]>(null)

  const [filter, setFilter] = useState<keyof TypeStartTimeText>('all')
  const handleOnFilter = (f: keyof TypeStartTimeText) => {
    setFilter(f)
  }

  const { codes, isFetching } = useContext(GlobalContext)

  const filteredCodes = codes !== null ? codes.filter(code => filterResult(filter, code.createTime)) : []

  const defaultValue: number = 5
  const [value, setValue] = useState<number>(defaultValue)

  useEffect(() => {
    if (mode === 'review') setReviewCards(LuckyCodes(codes, Number(value)))
  }, [codes, mode])

  return (
    <main>
      <div className='mb-6'>
        <div className='flex flex-row justify-between'>
          <Stack direction="row" spacing={2}>
            <Button onClick={() => {
              if (mode === 'review') setMode('achive')
              if (mode === 'achive') setMode('review')
            }} variant={'outlined'} color={mode === 'review' ? 'success' : 'info'} size='small'>
              {mode === 'review' ? '檢視' : '複習'}
            </Button>
          </Stack>
          <Stack direction='row' spacing={2}>
            {mode === 'review' ? (
              <>
                <TextField
                  sx={{
                    width: 30,
                  }}
                  size='small'
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(Number(e.target.value))
                  }}
                  defaultValue={defaultValue}
                  variant='standard'
                />
                <Button
                  onClick={() => {
                    setReviewCards(LuckyCodes(codes, Number(value)))
                  }}
                  size='small'
                  variant='contained'
                  color='error'
                >
                  抽卡
                </Button>
              </>
            ) :
              Object.keys(startTimeText).map((key: keyof TypeStartTimeText) => (
                <Button onClick={() => handleOnFilter(key)} variant={filter !== key ? 'outlined' : 'contained'} color='primary' size='small' key={key}>
                  {startTimeText[key]}
                </Button>
              ))
            }
          </Stack>
        </div>
      </div>

      <Typography component='h2' variant='h5'>{mode === 'review' ? '複習中...' : '檢視複習卡'} </Typography>
      <Divider />
      {isFetching || codes === null
        ? <Loading />
        : mode === 'review'
          ? reviewCards !== null && reviewCards.length !== 0
            ? reviewCards
              .map(code => (
                <CodeCard code={code} key={code.id} />
              ))
            : <div className='my-10'><Typography component='p' variant='body1'>沒有需要複習的複習卡。</Typography></div>
          : filteredCodes.length !== 0
            ? filteredCodes
              .map(code => (
                <CodeCard code={code} key={code.id} />
              ))
            : <div className='my-10'><Typography component='p' variant='body1'>沒有可供檢視的複習卡。</Typography></div>
      }
    </main>

  )
}
