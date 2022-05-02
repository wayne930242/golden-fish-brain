import { useEffect, useState, useContext } from 'react'
import {
  Stack,
  TextField,
  Typography,
  Button,
  Box,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'
import FormControl from '@mui/material/FormControl'

import { GlobalContext } from '../App'
import { CardsList } from '../components/CardsList'
import { Loading } from '../components/Loading'
import { LuckyCodes } from '../helper/data'
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

  const [luckyType, setLuckyType] = useState<'memoCurve' | 'peeped' | 'familiar'>('memoCurve')

  const { codes, isFetching } = useContext(GlobalContext)

  const filteredCodes = codes !== null ? codes.filter(code => filterResult(filter, code.editTime)) : []

  const defaultValue: number = 5
  const [value, setValue] = useState<number>(defaultValue)

  useEffect(() => {
    if (mode === 'review') setReviewCards(LuckyCodes(codes, Number(value), luckyType))
  }, [mode, luckyType])

  return (
    <main>
      <div className='py-6 my-6'>
        <div className='flex flex-row justify-between'>
          <Button onClick={() => {
            if (mode === 'review') setMode('achive')
            if (mode === 'achive') setMode('review')
          }} variant={mode === 'review' ? 'outlined' : 'contained'} color={mode === 'review' ? 'success' : 'info'}>
            {mode === 'review' ? '查看新卡' : '開始複習'}
          </Button>

          <Stack direction='row' spacing={2}>
            {mode === 'review' ? (
              <>
                <TextField
                  sx={{
                    width: 30,
                  }}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(Number(e.target.value))
                  }}
                  defaultValue={defaultValue}
                  variant='standard'
                />
                <Button
                  onClick={() => {
                    setReviewCards(LuckyCodes(codes, Number(value), luckyType))
                  }}
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

      <Typography component='h2' align='center' variant='h4' sx={{ marginBottom: 2 }}>{mode === 'review' ? '每日複習' : '新複習卡'} </Typography>

      {mode === 'review'
        ? (
          <Box sx={{ minWidth: 120, marginBottom: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">抽卡邏輯</InputLabel>
              <Select
                value={luckyType}
                label="抽卡邏輯"
                onChange={(e: SelectChangeEvent) => {
                  setLuckyType(e.target.value as 'memoCurve' | 'peeped' | 'familiar')
                }}
                size='small'
              >
                <MenuItem value='memoCurve'>記憶曲線</MenuItem>
                <MenuItem value='peeped'>有偷看的</MenuItem>
                <MenuItem value='familiar'>不熟悉的</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )
        : null
      }
      {isFetching || codes === null
        ? <Loading />
        : mode === 'review'
          ? <CardsList codes={reviewCards} noCardsString="沒有需要複習的複習卡。" />
          : <CardsList codes={filteredCodes} />
      }
    </main>
  )
}
