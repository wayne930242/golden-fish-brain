import { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import BannerImg from '../banner.jpg'
import { timeParser } from '../helper/view'
import { countDown } from '../data/testTime'

export const Banner = () => {
  const [endDay, setEndDay] = useState<string>('計算中...')
  const [updateDate, setUpdateDate] = useState<string>('計算中...')
  useEffect(() => {
    const setCountDown = () => {
      setEndDay("倒數 " + String(countDown()) + " 天")
      setUpdateDate("更新時間：" + timeParser(Date.now()))
    }
    setCountDown()
    let timer = setInterval(setCountDown, 1000 * 60 * 60)
    return(() => {
      clearInterval(timer)
    })
  }, [])

  return (
    <>
      <div className='w-full relative h-64 overflow-y-clip'>
        <img className='w-full' src={BannerImg} alt="banner" />
        <div className='text-white absolute text-center pt-20 top-0 left-0 w-full'>
          <Typography component='p' variant='h3'>{endDay}</Typography>
          <Typography component='p' variant='caption'>{updateDate}</Typography>
        </div>
      </div>
    </>
  )
}